'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">📖</span>
          <span className="font-display font-bold text-ink text-lg tracking-tight">Revision Buddy</span>
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white bg-primary px-2 py-0.5 rounded-full">Beta</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="hidden sm:block text-sm font-body font-medium text-muted hover:text-ink transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="bg-primary text-white text-sm font-display font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-primary hover:shadow-lg hover:-translate-y-px active:translate-y-0"
          >
            Start Revising →
          </Link>
        </div>
      </div>
    </nav>
  )
}
