#!/bin/bash

# Security cleanup script to remove leaked secrets from Git history
# This script will rewrite Git history to remove exposed Supabase secrets

echo "🚨 CRITICAL SECURITY CLEANUP STARTING 🚨"
echo "This will rewrite Git history to remove leaked secrets."
echo "⚠️  WARNING: This is a destructive operation that will change commit hashes."
echo ""

# Create a backup of the current state
echo "Creating backup..."
git tag security-backup-$(date +%s) || true

# Remove the specific leaked secrets from all commits
echo "Removing leaked secrets from Git history..."

# Remove the service role key
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch fixes/secure_server_setup.md fixes/vercel_env_setup_complete.md || true
if [ -f fixes/secure_server_setup.md ]; then
  sed -i.bak "s/SUPABASE_SERVICE_ROLE_KEY=.*/SUPABASE_SERVICE_ROLE_KEY=<LEAKED_SECRET_REDACTED>/g" fixes/secure_server_setup.md || true
  sed -i.bak "s/VITE_SUPABASE_ANON_KEY=.*/VITE_SUPABASE_ANON_KEY=<LEAKED_SECRET_REDACTED>/g" fixes/secure_server_setup.md || true
fi
if [ -f fixes/vercel_env_setup_complete.md ]; then
  sed -i.bak "s/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..*/<LEAKED_SECRET_REDACTED>/g" fixes/vercel_env_setup_complete.md || true
fi
git add fixes/secure_server_setup.md fixes/vercel_env_setup_complete.md || true' \
--prune-empty --tag-name-filter cat -- --all

echo "✅ Git history cleanup completed"
echo "⚠️  IMPORTANT: All team members must re-clone the repository after this cleanup"
echo "⚠️  The old repository history with secrets has been rewritten"
