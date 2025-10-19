#!/bin/bash

# VistaForge Waitlist Setup Script
# This script helps set up the waitlist system

echo "🚀 Setting up VistaForge Waitlist System..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Waitlist Configuration
# Optional: Send confirmation emails
SEND_CONFIRMATION_EMAIL=false

# Optional: Token for waitlist export endpoint (generate a secure random string)
WAITLIST_EXPORT_TOKEN=$(openssl rand -hex 32)

# Optional: Email provider configuration (if using confirmation emails)
# MAILCHIMP_API_KEY=your_mailchimp_api_key
# CONVERTKIT_API_KEY=your_convertkit_api_key
# SENDGRID_API_KEY=your_sendgrid_api_key
EOF
    echo "✅ Created .env.local with default configuration"
    echo "⚠️  Please update the Supabase credentials in .env.local"
else
    echo "✅ .env.local already exists"
fi

# Check if Supabase CLI is installed
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI found"
    
    # Check if we're in a Supabase project
    if [ -f "supabase/config.toml" ]; then
        echo "✅ Supabase project detected"
        echo "📊 Running database migration..."
        supabase db push
        echo "✅ Database migration completed"
    else
        echo "⚠️  No Supabase project found. Please run 'supabase init' first"
    fi
else
    echo "⚠️  Supabase CLI not found. Please install it:"
    echo "   npm install -g supabase"
    echo "   Or run the SQL migration manually in your Supabase dashboard"
fi

echo ""
echo "🎉 Waitlist setup complete!"
echo ""
echo "Next steps:"
echo "1. Update Supabase credentials in .env.local"
echo "2. Run the database migration (if not done automatically)"
echo "3. Test the integration by visiting your site"
echo "4. Check browser console for '[VistaForge Waitlist]' logs"
echo ""
echo "For more information, see WAITLIST-INTEGRATION.md"
