import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../src/components/layout/Navbar'
import Footer from '../src/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Dreamhorse Login',
  description: 'Login to your Dreamhorse account',
  icons: {
    icon: 'https://i.postimg.cc/kXwRjcXq/Dreamhorse-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}