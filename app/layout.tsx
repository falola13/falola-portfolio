import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8b5cf6',
}

export const metadata: Metadata = {
  title: 'Falola Olufemi Adedeji - Full-Stack Engineer',
  description: 'Full-Stack Engineer with 5 years of experience building and shipping user-focused web and mobile products across fintech, edtech, and consumer SaaS.',
  keywords: 'Full-Stack Engineer, React, Next.js, TypeScript, Node.js, Go, Frontend Developer, Backend Developer',
  authors: [{ name: 'Falola Olufemi Adedeji' }],
  openGraph: {
    title: 'Falola Olufemi Adedeji - Full-Stack Engineer',
    description: 'Full-Stack Engineer with 5 years of experience building and shipping user-focused web and mobile products.',
    type: 'website',
    locale: 'en_US',
    url: 'https://falolafemi.com',
    siteName: 'Falola Olufemi Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Falola Olufemi Adedeji - Full-Stack Engineer',
    description: 'Full-Stack Engineer with 5 years of experience building and shipping user-focused web and mobile products.',
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
  alternates: {
    canonical: 'https://falolafemi.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
      </body>
    </html>
  )
}