# Vercel Environment Variables Setup

## Your Supabase Project Details
- **Project URL**: `https://blwcbwzhjhmrkadndmip.supabase.co`
- **Project ID**: `blwcbwzhjhmrkadndmip`

## Required Environment Variables

You need to set these environment variables in your Vercel project:

### 1. VITE_SUPABASE_URL
```
Value: https://blwcbwzhjhmrkadndmip.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
Value: [Get this from your Supabase project settings]
```

## How to Set Environment Variables in Vercel

### Option A: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://blwcbwzhjhmrkadndmip.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `[Your anon key from Supabase]` | Production, Preview, Development |

### Option B: Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add VITE_SUPABASE_URL production
# When prompted, enter: https://blwcbwzhjhmrkadndmip.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, enter your anon key from Supabase

# Also set for preview environment
vercel env add VITE_SUPABASE_URL preview
vercel env add VITE_SUPABASE_ANON_KEY preview
```

## How to Get Your Supabase Anon Key

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/blwcbwzhjhmrkadndmip
2. Navigate to **Settings** → **API**
3. Copy the **anon/public** key (not the service_role key)
4. Use this key as the value for `VITE_SUPABASE_ANON_KEY`

## After Setting Environment Variables

1. **Redeploy**: Vercel will automatically redeploy when you push changes
2. **Or Manual Redeploy**: Go to Vercel dashboard → Deployments → Click "Redeploy" on the latest deployment

## Testing the Deployment

Once deployed, test:
1. Visit your Vercel deployment URL
2. Try the waitlist form
3. Check browser console for any errors
4. Verify Supabase connection is working

## Security Notes

✅ **Good**: No service role keys in client code
✅ **Good**: Environment variables are properly configured
✅ **Good**: Hardcoded credentials removed from code

The waitlist functionality should work once these environment variables are set!
