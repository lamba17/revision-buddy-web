import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Revision Buddy — Revise any chapter in 2 minutes',
  description: 'AI-powered revision notes for JEE Mains, JEE Advanced and NEET students. Key concepts, formulas, exam tips and MCQ practice.',
  keywords: 'JEE revision, NEET notes, JEE Mains preparation, AI study notes, MCQ practice',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
