# Secure Serverless Handlers

## 🚨 CRITICAL SECURITY NOTICE

**NEVER expose service role keys to client-side code or public repositories.**

This directory contains serverless functions that require the `SUPABASE_SERVICE_ROLE_KEY`. This key must:

1. **ONLY** be stored as a Vercel Secret
2. **ONLY** be accessed via `process.env.SUPABASE_SERVICE_ROLE_KEY` in serverless functions
3. **NEVER** be committed to Git or exposed in client bundles

## Setup Instructions

### 1. Create Vercel Secrets

```bash
# Create the service role key secret (server-side only)
vercel secrets add SUPABASE_SERVICE_ROLE_KEY "<YOUR_NEW_SERVICE_ROLE_KEY>"

# Create the public URL secret (safe for client)
vercel secrets add vite_supabase_url "https://your-project.supabase.co"
```

### 2. Set Environment Variables

In Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add `SUPABASE_SERVICE_ROLE_KEY` → Select "Use a secret" → Choose `SUPABASE_SERVICE_ROLE_KEY`
- Add `VITE_SUPABASE_URL` → Select "Use a secret" → Choose `vite_supabase_url`

### 3. Serverless Function Example

```javascript
// api/secure-admin.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Service role key is ONLY available server-side
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Server-side only!
  )
  
  // Perform admin operations here
  // This key has full database access - use carefully!
}
```

## Security Best Practices

- ✅ Service role key in Vercel secrets only
- ✅ Client code uses only anon key (`VITE_SUPABASE_ANON_KEY`)
- ✅ Serverless functions for admin operations
- ❌ Never put service role key in client code
- ❌ Never commit service role key to Git

## Key Rotation Required

**IMMEDIATE ACTION REQUIRED:**

1. **Rotate Supabase Service Role Key** in Supabase Dashboard:
   - Go to Project Settings → API → Rotate "Service role" key
   - Update Vercel secret with new key

2. **Rotate Anon Key** if compromised:
   - Go to Project Settings → API → Rotate "anon/public" key
   - Update Vercel environment variables

3. **Verify no secrets in built bundles:**
   ```bash
   npm run build
   grep -r "service_role\|SERVICE_ROLE" dist/ || echo "✅ No service keys found"
   ```

## Recovery Steps for Team

After this security cleanup:

1. **Re-clone the repository** (history has been rewritten)
2. **Update local branches** to match the cleaned history
3. **Verify no old secrets** in your local environment
4. **Update any personal tokens** that may have been compromised
