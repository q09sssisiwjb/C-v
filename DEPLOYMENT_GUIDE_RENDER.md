# Render Deployment Guide for CreatiVista AI

This guide will help you deploy your CreatiVista AI application to Render.com.

## Prerequisites

- A [Render.com](https://render.com) account (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Methods

### Method 1: Using render.yaml (Recommended)

This project includes a `render.yaml` configuration file that automates the deployment setup.

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New"** → **"Blueprint"**
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables** (if needed)
   - In the Render dashboard, go to your service
   - Navigate to **Environment** tab
   - Add any required API keys or secrets:
     - `GOOGLE_API_KEY` or `GEMINI_API_KEY` (for AI features)
     - `DATABASE_URL` (if using PostgreSQL)
     - `RESEND_API_KEY` (for email functionality)
     - Any other environment variables your app needs

4. **Deploy**
   - Click **"Apply"** to create the service
   - Render will build and deploy your application automatically

### Method 2: Manual Setup

1. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New"** → **"Web Service"**
   - Connect your Git repository

2. **Configure Build Settings**
   - **Name**: creativista-ai (or your preferred name)
   - **Runtime**: Node
   - **Branch**: main (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   - Add the following environment variables:
     - `NODE_ENV` = `production`
     - Add any API keys and secrets your app requires

4. **Deploy**
   - Click **"Create Web Service"**
   - Render will build and deploy your application

## Build Process

The build process consists of:

1. **Install dependencies**: `npm install`
2. **Build frontend**: `vite build` → outputs to `dist/public/`
3. **Build backend**: `esbuild server/index.ts` → outputs to `dist/`
4. **Start production server**: `node dist/index.js`

## Important Configuration Details

### Port Configuration
- Render assigns a dynamic port via `process.env.PORT`
- The app defaults to port 10000 on Render
- Your Express server is already configured to use `process.env.PORT`

### Database Setup (Optional)
If you need a PostgreSQL database:

1. **Create a PostgreSQL database** on Render
   - Click **"New"** → **"PostgreSQL"**
   - Choose a name and region
   - Click **"Create Database"**

2. **Connect to your web service**
   - Copy the **Internal Database URL** from the database info
   - Add it as an environment variable in your web service:
     - Key: `DATABASE_URL`
     - Value: (paste the Internal Database URL)

3. **Push database schema**
   - After deployment, run database migrations:
   ```bash
   npm run db:push
   ```

### Static Files
- Frontend build files are served from `dist/public/`
- The Express server handles both API routes and static file serving
- All routes not starting with `/api` are handled by React Router

## Post-Deployment

### Accessing Your App
- Your app will be available at: `https://your-app-name.onrender.com`
- It may take a few minutes for the initial build and deployment

### Auto-Deploy
- By default, Render auto-deploys when you push to your main branch
- You can disable this in the service settings if needed

### Monitoring
- View logs in the Render dashboard under the **Logs** tab
- Monitor deployment status and errors in real-time

### Custom Domain (Optional)
1. Go to your service settings
2. Navigate to **Custom Domain**
3. Add your domain and follow DNS configuration instructions

## Environment Variables Reference

Here are the environment variables your app may need:

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | Auto-set | Render provides this automatically |
| `GOOGLE_API_KEY` | Optional | For Google Gemini AI features |
| `GEMINI_API_KEY` | Optional | Alternative to GOOGLE_API_KEY |
| `DATABASE_URL` | Optional | PostgreSQL connection string |
| `RESEND_API_KEY` | Optional | For email functionality |
| `SESSION_SECRET` | Optional | For session management |

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `dependencies` (not `devDependencies`) if needed for production
- Verify Node.js version matches your local environment (currently set to 20.x)

### App Crashes on Startup
- Check the logs for error messages
- Verify all required environment variables are set
- Ensure the build command completed successfully

### 503 Service Unavailable
- This usually means the app failed to start
- Check logs for error messages
- Verify the start command is correct: `npm start`

### Static Files Not Loading
- The build process should output files to `dist/public/`
- Verify the build completed successfully
- Check that `vite.config.ts` has correct output directory

## Performance Optimization

### Free Tier Considerations
- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to a paid plan for production apps

### Caching
- Static assets are cached with appropriate headers
- API responses are not cached by default

## Support

For issues with Render deployment:
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- [Render Status](https://status.render.com/)

For issues with your application:
- Check the application logs in Render dashboard
- Review error messages and stack traces
- Test locally with `NODE_ENV=production npm run build && npm start`
