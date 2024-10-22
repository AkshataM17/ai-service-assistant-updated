import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatWidget from './components/ChatWidget'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer'

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
      <ChakraProvider>
          <main>
            {children}
          </main>
          <Footer />
        </ChakraProvider>
        <ChatWidget />
      </body>
    </html>
  )
}