import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import { fromZodError } from "zod-validation-error";
import { generateImageToImage, generateTextToImage } from "./gemini";
import { generateSupportSystemMessage } from "@shared/features-config";
import { insertAdminSchema, insertCommunityImageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const googleApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!googleApiKey) {
    console.warn("Warning: No Google API key found in environment variables. AI features will be disabled.");
  }
  
  const ai = googleApiKey ? new GoogleGenAI({ apiKey: googleApiKey }) : null;

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  app.post("/api/enhance-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "Prompt is required and must be a string" });
      }

      if (!ai) {
        return res.status(503).json({ 
          error: "AI service unavailable", 
          details: "Google API key not configured" 
        });
      }

      const enhancementPrompt = `You are an expert AI image prompt engineer. Your task is to enhance and improve image generation prompts to make them more detailed, creative, and effective for AI image generation.

Given the basic prompt: "${prompt}"

Please enhance this prompt by:
1. Adding specific visual details (lighting, colors, composition)
2. Including artistic style information if appropriate
3. Adding technical photography/art terms that improve image quality
4. Maintaining the original intent while making it more descriptive
5. Keeping it concise but detailed (aim for 1-2 sentences)

Return only the enhanced prompt, nothing else.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: enhancementPrompt,
      });

      const enhancedPrompt = response.text?.trim() || prompt;

      res.json({ enhancedPrompt });
      
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to enhance prompt", details: errorMessage });
    }
  });

  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: "Image data is required" });
      }

      if (!ai) {
        return res.status(503).json({ 
          error: "AI service unavailable", 
          details: "Google API key not configured. Please add your Gemini API key to use this feature." 
        });
      }

      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              },
              {
                text: "Analyze this image and create a detailed, descriptive prompt that could be used to generate a similar image with AI. Focus on: visual elements, composition, colors, lighting, style, mood, and any notable details. Return only the prompt, nothing else."
              }
            ]
          }
        ],
      });

      const prompt = response.text?.trim() || "Unable to generate prompt from image";

      res.json({ prompt });
      
    } catch (error) {
      console.error('Error generating prompt from image:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to generate prompt", details: errorMessage });
    }
  });

  app.post("/api/support-chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.status(503).json({ 
          error: "AI service unavailable", 
          details: "Google API key not configured" 
        });
      }

      const systemMessage = generateSupportSystemMessage();
      const chatHistory = [
        { role: "user", parts: [{ text: systemMessage }] },
        { role: "model", parts: [{ text: "Understood. I'm ready to help with CreatiVista AI support questions. How can I assist you today?" }] },
        ...history
          .filter((msg: any) => msg.content && msg.content.trim())
          .map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: chatHistory,
      });

      const reply = response.text?.trim() || "I apologize, but I'm having trouble generating a response. Please try again.";

      res.json({ response: reply });
      
    } catch (error) {
      console.error('Error in support chat:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to process support chat", details: errorMessage });
    }
  });

  app.post("/api/text-to-image", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({
          error: "Missing required field",
          details: "prompt is required"
        });
      }

      if (!googleApiKey) {
        return res.status(503).json({
          error: "AI service unavailable",
          details: "Gemini API key not configured"
        });
      }

      const result = await generateTextToImage(prompt);

      res.json({
        success: true,
        generatedImage: `data:image/png;base64,${result.imageData}`,
        description: result.description
      });

    } catch (error) {
      console.error('Error in text-to-image generation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({
        error: "Failed to generate text-to-image",
        details: errorMessage
      });
    }
  });

  app.post("/api/image-to-image", async (req, res) => {
    try {
      const { images, transformPrompt } = req.body;

      if (!transformPrompt || !images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
          error: "Missing required fields",
          details: "Both transformPrompt and images array are required"
        });
      }

      if (!googleApiKey) {
        return res.status(503).json({
          error: "AI service unavailable",
          details: "Gemini API key not configured"
        });
      }

      const result = await generateImageToImage(images, transformPrompt);

      res.json({
        success: true,
        generatedImage: `data:image/png;base64,${result.imageData}`,
        description: result.description
      });

    } catch (error) {
      console.error('Error in image-to-image generation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({
        error: "Failed to generate image-to-image",
        details: errorMessage
      });
    }
  });

  app.post("/api/sketch-to-image", async (req, res) => {
    try {
      const { sketchData, prompt } = req.body;

      if (!sketchData) {
        return res.status(400).json({
          error: "Missing required fields",
          details: "sketchData is required"
        });
      }

      if (!googleApiKey) {
        return res.status(503).json({
          error: "AI service unavailable",
          details: "Gemini API key not configured"
        });
      }

      const images = [{
        data: sketchData,
        type: 'image/png'
      }];

      const transformPrompt = prompt && prompt.trim() 
        ? `This is a hand-drawn sketch. Convert it into a realistic, high-quality photograph based on this sketch. ${prompt.trim()}. Maintain the composition and structure from the sketch while making it photorealistic.`
        : "This is a hand-drawn sketch. Convert it into a realistic, high-quality photograph with natural colors, proper lighting, and photorealistic details. Maintain the composition and structure from the sketch.";

      const result = await generateImageToImage(images, transformPrompt);

      res.json({
        success: true,
        imageData: result.imageData,
        description: result.description
      });

    } catch (error) {
      console.error('Error in sketch-to-image generation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({
        error: "Failed to generate sketch-to-image",
        details: errorMessage
      });
    }
  });

  app.get("/api/admin/check", async (req, res) => {
    try {
      const email = req.query.email as string;
      
      if (!email) {
        return res.json({ isAdmin: false });
      }

      const admin = await storage.getAdminByEmail(email);
      res.json({ isAdmin: !!admin });
      
    } catch (error) {
      console.error('Error checking admin status:', error);
      res.json({ isAdmin: false });
    }
  });

  app.post("/api/admin/create", async (req, res) => {
    try {
      const validation = insertAdminSchema.safeParse(req.body);
      
      if (!validation.success) {
        const errorMessage = fromZodError(validation.error);
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: errorMessage.toString()
        });
      }

      const existingAdmin = await storage.getAdminByEmail(validation.data.email);
      if (existingAdmin) {
        return res.status(409).json({ error: "Admin already exists" });
      }

      const admin = await storage.createAdmin(validation.data);
      res.json(admin);
      
    } catch (error) {
      console.error('Error creating admin:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to create admin", details: errorMessage });
    }
  });

  app.get("/api/community-images", async (_req, res) => {
    try {
      const images = await storage.getAllCommunityImages();
      res.json(images);
    } catch (error) {
      console.error('Error fetching community images:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to fetch community images", details: errorMessage });
    }
  });

  app.post("/api/admin/community-images", async (req, res) => {
    try {
      const validation = insertCommunityImageSchema.safeParse(req.body);
      
      if (!validation.success) {
        const errorMessage = fromZodError(validation.error);
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: errorMessage.toString()
        });
      }

      const image = await storage.createCommunityImage(validation.data);
      res.json(image);
      
    } catch (error) {
      console.error('Error creating community image:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to create community image", details: errorMessage });
    }
  });

  app.delete("/api/admin/community-images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "Image ID is required" });
      }

      await storage.deleteCommunityImage(id);
      res.json({ success: true });
      
    } catch (error) {
      console.error('Error deleting community image:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: "Failed to delete community image", details: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
