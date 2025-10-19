import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { PageTransitionProvider } from '@/components/providers/page-transition-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VistaForge - AI-Powered Real Estate Visualization',
  description: 'Transform ordinary properties into extraordinary visual experiences with AI-powered visualization technology that reveals the hidden potential in every space.',
  keywords: ['real estate', 'AI', 'visualization', 'property', '3D rendering', 'architecture'],
  authors: [{ name: 'VistaForge Team' }],
  creator: 'VistaForge',
  publisher: 'VistaForge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vistaforge.com'),
  openGraph: {
    title: 'VistaForge - AI-Powered Real Estate Visualization',
    description: 'Transform ordinary properties into extraordinary visual experiences with AI-powered visualization technology.',
    url: 'https://vistaforge.com',
    siteName: 'VistaForge',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VistaForge - AI-Powered Real Estate Visualization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VistaForge - AI-Powered Real Estate Visualization',
    description: 'Transform ordinary properties into extraordinary visual experiences with AI-powered visualization technology.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <TooltipProvider>
                <PageTransitionProvider>
                  {children}
                </PageTransitionProvider>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* VistaForge Waitlist Integration */}
        <script 
          src="/waitlist-integration.js" 
          async
          data-waitlist-config='{"debug": false, "showMessages": true}'
        />
      </body>
    </html>
  )
}
