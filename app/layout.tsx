import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatWidget from './components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Customer Service Assistant',
  description: 'AI-powered customer service chatbot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}