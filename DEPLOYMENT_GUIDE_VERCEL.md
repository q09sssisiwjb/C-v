# Deploying CreatiVista AI to Vercel

This guide will help you deploy your CreatiVista AI application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Select your GitHub repository
   - Vercel will auto-detect the settings

3. **Configure Environment Variables**
   - In the Vercel dashboard, go to your project
   - Navigate to **Settings** → **Environment Variables**
   - Add the following environment variables:
     - `DATABASE_URL` - Your PostgreSQL database connection string
     - `GOOGLE_API_KEY` - Your Google AI API key (if using AI features)
     - `RESEND_API_KEY` - Your Resend API key (if using email)
     - Any other API keys your application needs

4. **Deploy**
   - Click **"Deploy"**
   - Vercel will build and deploy your application
   - You'll get a production URL like `your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

## Configuration Files

The following files have been configured for Vercel deployment:

- **`vercel.json`** - Vercel configuration for routing and serverless function settings
- **`api/index.ts`** - Serverless Express API handler (exports Vercel-compatible handler function)
- **`.vercelignore`** - Files to exclude from deployment

### Key Technical Details

The application uses a **hybrid deployment pattern** optimized for Vercel:

1. **Static File Serving**: Frontend assets (`dist/public/`) served directly by Vercel's CDN
2. **Serverless API**: Backend API routes handled by serverless function at `api/index.ts`
3. **Route Configuration**: Smart routing directs `/api/*` to serverless functions, everything else to static files
4. **Lazy Initialization**: Routes are registered on first request to minimize cold start time

## Database Setup

### Option 1: Use Vercel Postgres (Recommended)

1. In your Vercel project dashboard, go to **Storage**
2. Click **"Create Database"** → **"Postgres"**
3. Vercel will automatically set the `DATABASE_URL` environment variable
4. Run database migrations after deployment

### Option 2: Use External Database (Neon, Supabase, etc.)

1. Create a PostgreSQL database on your preferred provider
2. Copy the connection string
3. Add it to Vercel environment variables as `DATABASE_URL`

## Running Database Migrations

After deployment, you'll need to push your database schema:

1. Install Vercel CLI if you haven't already
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull`
4. Run migrations: `npm run db:push`

Alternatively, you can set up GitHub Actions to run migrations automatically on deployment.

## Testing Your Deployment

1. After deployment, visit your Vercel URL
2. Test API endpoints: `https://your-app.vercel.app/api/community-images`
3. Check that all features work correctly

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Verify TypeScript types are correct

### API Routes Don't Work

- Check that `vercel.json` is configured correctly
- Verify environment variables are set
- Check serverless function logs in Vercel dashboard

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Ensure database allows connections from Vercel IP addresses
- Check that SSL is configured if required

## Custom Domain

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables

Make sure to set these in Vercel:

- `NODE_ENV=production` (automatically set by Vercel)
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_API_KEY` - For AI features
- `RESEND_API_KEY` - For email functionality
- Any other API keys your app requires

## Notes

- Vercel runs Express as serverless functions (not a traditional server)
- Each API route is a separate serverless function
- Cold starts may occur for infrequently accessed routes
- Free tier includes 100GB bandwidth and 100 serverless function invocations per day

## Support

For more information, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Express.js Guide](https://vercel.com/guides/using-express-with-vercel)
