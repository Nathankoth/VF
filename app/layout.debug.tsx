import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

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
  description: 'Transform ordinary properties into extraordinary visual experiences with AI-powered visualization technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        <div style={{padding: 20, background: '#fff', color: '#000'}}>
          <h1>DEBUG: Layout Working</h1>
          <p>If you see this, the layout renders correctly.</p>
          {children}
        </div>
      </body>
    </html>
  )
}
