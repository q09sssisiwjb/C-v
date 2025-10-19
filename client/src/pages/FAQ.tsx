import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is CreatiVista ai?",
          answer: "CreatiVista ai is a powerful AI-powered image generation platform that uses Google Gemini AI to create stunning images from text descriptions. Transform your ideas into beautiful visual artwork in seconds."
        },
        {
          question: "How do I create my first image?",
          answer: "Navigate to the 'Generate' tool, enter a detailed description of what you want to create, select your preferred settings, then click 'Generate'. Your AI-generated image will appear within seconds and you can download it immediately."
        },
        {
          question: "Is there a limit to how many images I can generate?",
          answer: "CreatiVista ai is free to use! Generate as many images as you want with our AI tools."
        },
        {
          question: "What image formats are supported?",
          answer: "We support JPG and PNG formats for uploads. Generated images can be downloaded in PNG format for the best quality."
        }
      ]
    },
    {
      category: "AI Tools & Features",
      questions: [
        {
          question: "What AI tools are available?",
          answer: "CreatiVista ai offers powerful AI features including Text-to-Image Generation, Image-to-Image Transformation, Background Remover, Image Upscaler, Image-to-Sketch, and Canvas Editor for creative image manipulation."
        },
        {
          question: "How does the Text-to-Image generator work?",
          answer: "Our Text-to-Image generator uses Google Gemini AI (gemini-2.0-flash-exp model) to create images from your text descriptions. Simply describe what you want to see, and the AI will generate unique artwork based on your prompt."
        },
        {
          question: "How do I use the Background Remover?",
          answer: "Upload an image with a clear subject, and our AI will automatically detect and remove the background. The result can be exported with a transparent background in PNG format. It works best with well-lit photos and clear subjects."
        },
        {
          question: "What is Image Upscaling?",
          answer: "Image Upscaling uses AI to increase image resolution while enhancing quality and maintaining detail. Perfect for preparing images for print or high-resolution displays."
        },
        {
          question: "Can I transform existing images?",
          answer: "Yes! Use the Image-to-Image tool to transform existing images with AI. Upload an image and add a prompt describing how you want to modify it. You can also use the Image-to-Sketch tool to convert photos into artistic sketches."
        }
      ]
    },
    {
      category: "Image Generation Tips",
      questions: [
        {
          question: "How do I write better prompts?",
          answer: "Be specific and descriptive! Include details about the subject, style, lighting, colors, and mood you want. For example, instead of 'a cat', try 'a fluffy orange tabby cat sitting on a windowsill, soft natural lighting, photorealistic style'."
        },
        {
          question: "What makes a good AI image prompt?",
          answer: "Good prompts include: 1) Clear subject description, 2) Artistic style or medium, 3) Lighting and atmosphere, 4) Color palette, 5) Composition details. You can also use the prompt enhancement feature to improve your descriptions."
        },
        {
          question: "Can I download my generated images?",
          answer: "Yes! Every generated image can be downloaded immediately. Simply click the download button on any image you create."
        },
        {
          question: "What if I'm not happy with the generated image?",
          answer: "Try refining your prompt with more specific details, or generate multiple variations by adjusting your description. The AI works best with clear, detailed prompts."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "Do I need an account to use CreatiVista ai?",
          answer: "You can try our tools without an account, but creating a free account gives you access to all features and lets you track your creations."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take data security seriously. We use Firebase Authentication for secure account management. Your generated images are processed securely and we never share your data without permission."
        },
        {
          question: "How is my information used?",
          answer: "We only use your information to provide and improve our services. We do not sell your personal information or generated images to third parties. See our Privacy Policy for complete details."
        }
      ]
    },
    {
      category: "Support",
      questions: [
        {
          question: "How do I get help if I have a problem?",
          answer: "Visit the 'Support' page for AI-powered customer support, or use the contact form on the 'Contact Us' page to reach our team directly. We're here to help!"
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer: "Use the 'Contact Us' page to submit bug reports or feature suggestions. Our team reviews all feedback and uses it to continuously improve the platform."
        },
        {
          question: "What browsers are supported?",
          answer: "CreatiVista ai works best on modern browsers including Chrome, Firefox, Safari, and Edge. Make sure you're using the latest version for the best experience."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="faq-page-title">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Find answers to common questions about CreatiVista ai
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="p-6">
            <h2 className="text-2xl font-bold mb-4" data-testid={`faq-category-${categoryIndex}`}>
              {category.category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem
                  key={faqIndex}
                  value={`item-${categoryIndex}-${faqIndex}`}
                  data-testid={`faq-item-${categoryIndex}-${faqIndex}`}
                >
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 bg-muted/50">
        <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
        <p className="text-muted-foreground mb-4">
          Can't find what you're looking for? Our support team is here to help!
        </p>
        <a
          href="/contact-us"
          className="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          data-testid="contact-support-button"
        >
          Contact Support
        </a>
      </Card>
    </div>
  );
}
