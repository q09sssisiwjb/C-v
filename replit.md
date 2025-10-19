# Overview

CreatiVista ai is a streamlined AI-powered image generation platform built as a full-stack TypeScript application with a React frontend and Express.js backend. The platform provides real-time AI image generation capabilities including text-to-image generation, image-to-image transformation, background removal, image upscaling, sketching, and canvas editing. The application focuses on real-time generation without persistent image storage, delivering a modern user experience with a dark-themed UI and community showcase section with curated fallback images.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The platform features a modern dark-themed UI built with React 18, Tailwind CSS, and shadcn/ui components. It adopts a mobile-first approach with responsive design, utilizes Inter and Space Grotesk fonts, and includes a comprehensive UI component library based on Radix UI primitives. The sidebar navigation provides access to core AI generation tools, admin panel, support pages, and static content pages.

## Technical Implementations
The frontend uses React 18 with TypeScript, React Query for server state management, and Wouter for routing. Vite handles frontend development and builds. The backend is an Express.js server with TypeScript, following a RESTful API design, operating on Node.js 18+ with ESM modules. It includes centralized route registration, global error handling, and custom logging middleware.

## Feature Specifications (Updated October 19, 2025)
Key features include:
- **AI Image Tools**: Text-to-Image, Image-to-Image, Background Remover, Upscaler, Image-to-Sketch, and Canvas Editor for real-time image generation and manipulation.
- **Authentication**: Firebase Authentication for email/password and Google OAuth. Admin authentication managed through admins table in database.
- **Admin Panel**: Admin authentication verification against database-stored admin list. Admin routes verify email against admin table.
- **Community Showcase**: Display of curated fallback images with filter functionality (no database persistence).
- **Real-Time Generation**: All images generated in real-time via Google Gemini AI. Images can be downloaded immediately but are not stored in database.
- **Storage Model**: Minimal database usage - only stores admin accounts. No image persistence, user profiles, favorites, or custom styles stored.
- **API Embed Codes**: Public API page with iframe embed codes for all AI tools, allowing external websites to integrate CreatiVista AI features.

## System Design Choices
The application uses a simplified storage abstraction layer with Neon PostgreSQL database storing only admin account data (managed through Drizzle ORM). Firebase Authentication manages user sessions and authentication states for frontend access. The build process uses Vite for the frontend and ESBuild for the backend. The Express server serves both the API and frontend on a single port. All AI generation features work in real-time without database persistence.

## Recent Changes (October 19, 2025)

### Database Simplification
- Removed all database tables except `admins` table
- Eliminated persistent storage for: images, user profiles, favorites, art styles, custom models, effects, backgrounds
- Admin authentication still functional via database-stored admin list
- Application now focuses on real-time generation without persistence

### UI Simplification
- Removed sidebar pages: Effects, Art Styles, My Art Style, Messages, Guides, Settings, Profile, Favorites
- Updated navigation to show only: Generate, Image-to-Image, Background Remover, Upscaler, Sketch, Canvas, Gallery, Admin Panel, static pages
- Community Gallery shows curated fallback images instead of database-fetched content
- Updated FAQ page to reflect simplified feature set

### Backend Simplification
- Removed API routes for image saving, profile management, favorites, art styles, custom models
- Kept AI generation endpoints: text-to-image, image-to-image, background removal, upscaling, sketch conversion
- Storage interface now only handles admin CRUD operations
- All image generation is real-time with no persistence

# External Dependencies

## Database and Storage
- **Neon PostgreSQL**: Minimal storage for admin accounts only
- **Drizzle ORM**: Type-safe database queries and schema management

## Authentication Services
- **Firebase Authentication**: User authentication and management (email/password, Google OAuth)
- **Firebase SDK**: Client-side authentication handling

## AI/ML Integrations
- **Google Gemini API**: Requires `GOOGLE_API_KEY` or `GEMINI_API_KEY` environment variable for AI image generation features (Gemini 2.0 Flash Experimental model)
- **Hugging Face**: Support for custom models via Hugging Face APIs (optional)

## UI and Frontend Libraries
- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library built on Radix UI
- **Radix UI**: Headless UI primitives
- **Lucide React**: Icon library
- **React Query**: Server state management
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form management and validation

## Development and Build Tools
- **TypeScript**: Language for type safety
- **Vite**: Frontend build tool
- **ESBuild**: Backend bundling

## Third-party Integrations
- **Google Fonts**: Web font loading
- **Unsplash/Pixabay**: Placeholder content for community gallery showcase

# Replit Environment Setup

## Current Status (Last Updated: October 19, 2025 - Database Simplification Complete)

The application has been streamlined to focus on real-time AI generation without image persistence. Database now stores only admin accounts for authentication. All AI generation features remain fully functional.

### Completed Setup
✅ Node.js 20 installed and configured
✅ All npm dependencies installed and working
✅ Workflow configured for port 5000 with webview output
✅ Frontend server running on 0.0.0.0:5000
✅ Host configuration (`allowedHosts: true`) properly set for Replit proxy
✅ Deployment configuration set for autoscale (build + run commands configured)
✅ Application successfully loads and displays UI
✅ Backend API responding correctly (health check verified)
✅ Vite HMR (Hot Module Replacement) connected and working
✅ .gitignore file created for Node.js project
✅ Database schema simplified to only admins table
✅ Database schema pushed successfully using Drizzle Kit
✅ Default admin account configured (eeweed27ai@admin.com)
✅ API embed page added with iframe codes for all tools
✅ X-Frame-Options header removed to enable iframe embedding on external websites
✅ Navigation simplified - removed 8 pages (Favorites, Profile, Settings, Effects, Art Styles, My Art Style, Messages, Guides)
✅ Community Gallery updated to show curated fallback images
✅ Backend routes simplified to AI generation only

### Required Environment Variables

To enable full functionality, the following environment variables need to be configured in Replit Secrets:

1. **Google Gemini API** (Required for AI image generation):
   - `GOOGLE_API_KEY` or `GEMINI_API_KEY`
   - Get from: https://aistudio.google.com/apikey

2. **Firebase Authentication** (Required for user login/signup):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID` (optional)
   - Get from: Firebase Console (https://console.firebase.com)

3. **Database** (Required for admin authentication only):
   - `DATABASE_URL` - Neon PostgreSQL connection string
   - **Current Status**: ✅ Configured and active
   - Database now only stores admin accounts
   - If DATABASE_URL is not available, app falls back to in-memory storage for admins

### Running the Project

The project is configured with a single workflow:
- **Workflow Name**: "Start application"
- **Command**: `npm run dev`
- **Port**: 5000
- **Output**: webview

The workflow starts automatically and serves both the frontend and backend API on the same port.

### Development Notes

- The Vite dev server is configured to accept all hosts (required for Replit proxy)
- Frontend runs on 0.0.0.0:5000 with HMR (Hot Module Replacement)
- Backend API routes are prefixed with `/api`
- The server handles both development (Vite middleware) and production (static files)
- No separate backend server needed - Express serves everything on port 5000
- All AI generation is real-time with no database persistence
- Community Gallery displays curated fallback images without API calls

### Security Considerations

**Admin Authentication:**
- Admin status verified by checking email against admins table in database
- **Limitation**: Current implementation relies on client-provided credentials without server-side session verification
- **Recommended Enhancement**: For production deployments, implement Firebase Admin SDK middleware to verify authentication tokens server-side
- This limitation applies to all admin routes in the application
- Frontend authentication (Firebase) is separate from backend authorization checks

### Deployment

Deployment is configured for Replit Autoscale:
- **Build**: `npm run build`
- **Run**: `npm run start`
- **Target**: autoscale (stateless web app)

The build process compiles both frontend (Vite) and backend (ESBuild) for production.
