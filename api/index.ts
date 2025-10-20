import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

// Middleware
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: false, limit: '60mb' }));

// Simple logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Initialize routes once
let initialized = false;

async function init() {
  if (!initialized) {
    await registerRoutes(app);
    
    // Error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      console.error(`Error: ${status} - ${message}`);
    });
    
    initialized = true;
    console.log('API routes initialized');
  }
}

// Export handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  await init();
  return app(req as any, res as any);
};
