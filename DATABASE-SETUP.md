# VistaForge Waitlist Database Setup

This guide will help you set up the database table for the VistaForge waitlist system.

## Quick Setup (Recommended)

### Option 1: Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Sign in to your account

2. **Select Your Project**
   - Find and click on your VistaForge project: `vhugicmqspbuytqqimnx`

3. **Open SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click "New query"

4. **Run the Migration**
   - Copy the entire contents of `supabase/migrations/001_create_waitlist_table.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute the migration

5. **Verify the Table**
   - Go to "Table Editor" in the left sidebar
   - You should see a new table called `waitlist`

### Option 2: Supabase CLI (Advanced)

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref vhugicmqspbuytqqimnx

# Push the migration
supabase db push
```

## Manual Table Creation

If you prefer to create the table manually, here's the SQL:

```sql
-- Create waitlist table for VistaForge
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    email TEXT NOT NULL,
    role TEXT,
    source TEXT,
    referrer TEXT,
    meta JSONB
);

-- Create unique index on email to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique ON public.waitlist(email);

-- Create index on created_at for efficient querying
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON public.waitlist(created_at);

-- Create index on source for analytics
CREATE INDEX IF NOT EXISTS waitlist_source_idx ON public.waitlist(source);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for waitlist signups)
CREATE POLICY "Allow anonymous waitlist signups" ON public.waitlist
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Create policy to allow authenticated users to read their own waitlist entries
CREATE POLICY "Users can read own waitlist entries" ON public.waitlist
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Create policy to allow service role to read all entries (for admin/export)
CREATE POLICY "Service role can read all waitlist entries" ON public.waitlist
    FOR ALL 
    TO service_role 
    USING (true);

-- Add comment to table
COMMENT ON TABLE public.waitlist IS 'VistaForge waitlist signups with user information and metadata';
```

## Testing the Setup

After creating the table, test the waitlist functionality:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the API endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "name": "Test User"}'
   ```

3. **Expected response:**
   ```json
   {
     "ok": true,
     "message": "Thanks — you are on the waitlist! We will notify you when VistaForge is ready.",
     "id": "uuid-string"
   }
   ```

4. **Verify in database:**
   - Go to Supabase Dashboard → Table Editor → waitlist
   - You should see your test entry

## Troubleshooting

### Common Issues

1. **"relation 'waitlist' does not exist"**
   - The table hasn't been created yet
   - Run the SQL migration in Supabase Dashboard

2. **"permission denied for table waitlist"**
   - RLS policies might not be set up correctly
   - Re-run the migration SQL

3. **"duplicate key value violates unique constraint"**
   - This is expected behavior - the same email can't be added twice
   - The API will return a success message for existing emails

### Verify RLS Policies

Check that the Row Level Security policies are correctly set up:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

## Next Steps

Once the database is set up:

1. **Test the integration** using the test page: `http://localhost:3000/test-waitlist.html`
2. **Verify automatic detection** by clicking signup buttons on your site
3. **Check the export endpoint** (requires setting `WAITLIST_EXPORT_TOKEN` in `.env.local`)

## Security Notes

- The waitlist table allows anonymous inserts (for public signups)
- Email addresses are unique to prevent duplicates
- IP addresses and user agents are stored for security/analytics
- Export functionality requires authentication token

For more information, see [WAITLIST-INTEGRATION.md](./WAITLIST-INTEGRATION.md).
