# VistaForge - Next.js Migration

This is the Next.js version of VistaForge, migrated from the original Vite-based React application. The migration preserves the exact landing page design while providing a stable foundation for all pages and backend integrations.

## 🚀 Features

- **Next.js App Router** - Modern routing with server-side rendering
- **TypeScript** - Full type safety throughout the application
- **TailwindCSS** - Utility-first CSS framework with custom design system
- **Supabase Integration** - Authentication, database, and storage
- **AI-Powered Visualization** - 2D and 3D property rendering capabilities
- **Responsive Design** - Mobile-first approach with beautiful UI
- **Theme Support** - Light and dark mode with smooth transitions

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── projects/      # Project management
│   │   └── generate/      # AI generation endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
└── public/               # Static assets
    └── assets/           # Images and media
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Copy the Next.js package.json
cp package-nextjs.json package.json

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://vhugicmqspbuytqqimnx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API (for backend use only)
OPENAI_API_KEY=your_openai_api_key

# Stripe (for future billing)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Configuration Files

```bash
# Copy configuration files
cp tailwind.config.nextjs.ts tailwind.config.ts
cp postcss.config.nextjs.js postcss.config.js
cp tsconfig.nextjs.json tsconfig.json
cp next.config.js .
cp next-env.d.ts .
```

### 4. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Gold primary theme with elegant dark accents
- **Typography**: Poppins for headings, Inter for body text
- **Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth transitions
- **Layout**: Responsive grid system with consistent spacing

## 🔧 API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/me` - Get current user

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project

### Generation
- `POST /api/generate/image` - Generate 2D visualization
- `POST /api/generate/img2img` - Image-to-image generation

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to your preferred platform
# The build output is in the .next directory
```

## 📱 Pages

### Public Pages
- `/` - Landing page (preserved exact design)
- `/faq` - Frequently asked questions
- `/features` - Feature showcase
- `/services` - Service offerings

### Authentication
- `/auth/login` - User login
- `/auth/signup` - User registration
- `/auth/forgot-password` - Password reset

### Dashboard
- `/dashboard` - Main dashboard with projects
- `/profile` - User profile and settings

### Project Management
- `/project/[id]` - Individual project viewer
- `/roi` - ROI calculator
- `/portfolio` - Portfolio overview

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- API route authentication
- Secure headers configuration
- Input validation and sanitization

## 🎯 Key Improvements

1. **Server-Side Rendering** - Better SEO and performance
2. **API Routes** - Backend functionality without separate server
3. **Image Optimization** - Next.js Image component for better performance
4. **Type Safety** - Full TypeScript support
5. **Deployment Ready** - Optimized for Vercel deployment
6. **Scalable Architecture** - Clean separation of concerns

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed
2. **Environment Variables**: Check `.env.local` file exists
3. **Supabase Connection**: Verify API keys are correct
4. **Image Loading**: Ensure images are in `public/assets/` directory

### Development Tips

- Use `npm run type-check` to verify TypeScript
- Check browser console for client-side errors
- Use Next.js dev tools for debugging
- Monitor network tab for API calls

## 📞 Support

For issues or questions:
- Check the FAQ page at `/faq`
- Review the API documentation
- Contact support at support@vistaforge.com

## 🔄 Migration Notes

This Next.js version preserves:
- ✅ Exact landing page design and layout
- ✅ All UI components and styling
- ✅ Theme system and color scheme
- ✅ Responsive design and animations
- ✅ Supabase integration
- ✅ Component structure and functionality

New features added:
- 🆕 Server-side rendering
- 🆕 API routes for backend functionality
- 🆕 Next.js Image optimization
- 🆕 App Router structure
- 🆕 Enhanced TypeScript support
