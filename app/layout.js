import { Dosis } from 'next/font/google'
import './globals.css'

const inter = Dosis({ subsets: ['latin'],weight:'400' })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
