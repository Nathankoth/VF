'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProviderProps {
  children: ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  // Simplified version without framer-motion to prevent blank page
  return <div className="w-full">{children}</div>
}
