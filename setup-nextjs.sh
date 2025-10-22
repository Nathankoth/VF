#!/bin/bash

# VistaForge Next.js Migration Setup Script
echo "🚀 Setting up VistaForge Next.js migration..."

# Backup original files
echo "📦 Creating backup of original files..."
mkdir -p backup
cp package.json backup/package.json.backup 2>/dev/null || true
cp tailwind.config.ts backup/tailwind.config.ts.backup 2>/dev/null || true
cp postcss.config.js backup/postcss.config.js.backup 2>/dev/null || true
cp tsconfig.json backup/tsconfig.json.backup 2>/dev/null || true

# Replace configuration files
echo "⚙️  Updating configuration files..."
cp package-nextjs.json package.json
cp tailwind.config.nextjs.ts tailwind.config.ts
cp postcss.config.nextjs.js postcss.config.js
cp tsconfig.nextjs.json tsconfig.json
cp next.config.js .
cp next-env.d.ts .

# Create environment file
echo "🔐 Setting up environment variables..."
if [ ! -f .env.local ]; then
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI API (for backend use only)
OPENAI_API_KEY=your_openai_api_key_here

# Stripe (for future billing)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
EOF
    echo "✅ Created .env.local file"
else
    echo "⚠️  .env.local already exists, skipping..."
fi

# Install dependencies
echo "📦 Installing Next.js dependencies..."
npm install

# Create .gitignore for Next.js
echo "📝 Updating .gitignore..."
cat >> .gitignore << EOF

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
EOF

echo "✅ Next.js migration setup complete!"
echo ""
echo "🎉 Next steps:"
echo "1. Update your environment variables in .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your Next.js app"
echo ""
echo "📚 For more information, see README-NEXTJS.md"
echo ""
echo "🔧 Available scripts:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run start   - Start production server"
echo "  npm run lint    - Run ESLint"
echo ""
