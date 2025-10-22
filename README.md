# VistaForge (Lovable.ai waiting-list) — Repo Setup & Deploy Guide

This repo bundle contains recommended configuration and helper files to safely use a cloned Lovable.ai waiting-list UI with Supabase and deploy on Vercel.

## 🔒 Security Features

- **Secret Scanning**: Automated detection of exposed API keys and secrets
- **Rate Limiting**: Built-in protection against abuse
- **Input Validation**: Comprehensive sanitization of user inputs
- **Secure Headers**: Security headers for XSS, CSRF, and clickjacking protection
- **Environment Variables**: Proper separation of secrets from code

## 🚀 Quick Start (Local Development)

1. **Clone and setup**:
   ```bash
   git clone <your-repo-url>
   cd waitlist
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🚀 Deploy to Vercel

1. **Import repo in Vercel**:
   - Go to Vercel dashboard → New Project → Import GitHub repo
   - Select your repository

2. **Add environment variables**:
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Deploy**:
   - Vercel will automatically use the `build` script from `package.json`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run audit` - Security audit

## 🛡️ Security Notes

- **Never commit `.env` files** - Use `.env.local` for local development
- **Rotate any keys** that may have been exposed in Git history
- **Use serverless API routes** for operations requiring Supabase `service_role` key
- **Keep secrets in Vercel environment variables**, not in code

## 📁 Project Structure

This is the **frontend-only** repository for VistaForge, an AI-powered real estate visualization platform. The backend services (authentication, database, APIs) are handled by **Supabase**.

## 🚀 Features

- **AI-Powered Visualization**: Transform properties into stunning 2D and 3D visualizations
- **Smart ROI Analysis**: Comprehensive investment analysis with market predictions
- **Real-time Market Data**: Access to current market trends and insights
- **Interactive 3D Rendering**: Built with Three.js for immersive property experiences
- **Responsive Design**: Optimized for all devices with smooth animations
- **Supabase Integration**: Seamless authentication and database operations

## 🏗️ Architecture

```
vistaforge-frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── HeroSection.tsx # Landing page hero
│   │   ├── Features.tsx   # Feature showcase
│   │   └── ...
│   ├── pages/             # Application pages
│   │   ├── Index.tsx      # Landing page
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── Login.tsx      # Authentication
│   │   └── ...
│   ├── lib/               # Utilities and configurations
│   │   ├── supabase.ts    # Supabase client
│   │   └── utils.ts       # Helper functions
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React contexts
│   └── assets/            # Static assets
├── public/                # Public assets
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Authentication, Database, Storage)
- **3D Rendering**: Three.js + React Three Fiber
- **State Management**: Zustand + React Query
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nathankoth/fintech-template-7671.git vistaforge-frontend
   cd vistaforge-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env.local` file
4. Set up your database schema (see Database Schema section)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

## 🗄️ Database Schema

The application expects the following Supabase tables:

### Properties Table
```sql
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  sqft INTEGER,
  images TEXT[],
  user_id UUID REFERENCES auth.users(id)
);
```

### Visualizations Table
```sql
CREATE TABLE visualizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  property_id UUID REFERENCES properties(id),
  type TEXT CHECK (type IN ('2d', '3d')),
  style TEXT NOT NULL,
  image_url TEXT NOT NULL,
  metadata JSONB,
  user_id UUID REFERENCES auth.users(id)
);
```

### ROI Analyses Table
```sql
CREATE TABLE roi_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  property_id UUID REFERENCES properties(id),
  analysis_data JSONB NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set environment variables**
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel dashboard

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features on GitHub Issues
- **Discussions**: Join community discussions on GitHub Discussions

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Supabase Dashboard**: [Your Supabase Project]

---

Built with ❤️ by the VistaForge Team