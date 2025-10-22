# Vercel Environment Variables - Complete Setup

## Your Supabase Configuration
- **Project URL**: `https://blwcbwzhjhmrkadndmip.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNTcsImV4cCI6MjA3NjU3MDA1N30._u7rwYxZsyHykkyEeNssIyFTfAFKwIdyjAFuyA9gUsE`

## Vercel Environment Variables to Set

### Option 1: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables for **Production**, **Preview**, and **Development**:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://blwcbwzhjhmrkadndmip.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNTcsImV4cCI6MjA3NjU3MDA1N30._u7rwYxZsyHykkyEeNssIyFTfAFKwIdyjAFuyA9gUsE` |

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add VITE_SUPABASE_URL production
# Enter: https://blwcbwzhjhmrkadndmip.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNTcsImV4cCI6MjA3NjU3MDA1N30._u7rwYxZsyHykkyEeNssIyFTfAFKwIdyjAFuyA9gUsE

# Also set for preview environment
vercel env add VITE_SUPABASE_URL preview
vercel env add VITE_SUPABASE_ANON_KEY preview
```

## After Setting Environment Variables

1. **Redeploy**: Vercel will automatically redeploy when you push changes
2. **Or Manual Redeploy**: Go to Vercel dashboard → Deployments → Click "Redeploy" on the latest deployment

## Testing the Deployment

Once deployed, test:
1. Visit your Vercel deployment URL
2. Try the waitlist form
3. Check browser console for any errors
4. Verify Supabase connection is working

## Expected Results

✅ **Waitlist form should work**
✅ **No console errors**
✅ **Supabase connection established**
✅ **Form submissions will be stored in your Supabase database**

## Security Notes

✅ **Good**: No service role keys in client code
✅ **Good**: Environment variables are properly configured
✅ **Good**: Hardcoded credentials removed from code
✅ **Good**: Anon key is safe to use in client-side code

The waitlist functionality should work perfectly once these environment variables are set!
