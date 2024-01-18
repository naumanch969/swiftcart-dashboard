import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - SwiftCart',
  description: 'Admin panel of SwiftCard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, 'min-h-screen')}  >
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
