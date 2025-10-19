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
