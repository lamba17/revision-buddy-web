'use client'
import { useState } from 'react'
import type { Formula } from '../types'

interface Props {
  title: string
  emoji: string
  accentColor: string
  items?: string[]
  formulas?: Formula[]
}

export default function RevisionCard({ title, emoji, accentColor, items, formulas }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <div
      className="rounded-2xl overflow-hidden border border-border"
      style={{ borderLeftWidth: 4, borderLeftColor: accentColor, background: 'rgba(255,255,255,0.04)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          <span className="font-display font-bold text-ink text-[15px]">{title}</span>
        </div>
        <span
          className="text-xs font-bold transition-transform duration-200"
          style={{ color: accentColor, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 animate-fade-in">
          {items?.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              <p className="font-body text-sm text-ink leading-relaxed">{item}</p>
            </div>
          ))}

          {formulas?.map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5 border"
              style={{ backgroundColor: accentColor + '0d', borderColor: accentColor + '30' }}
            >
              <p className="font-mono font-bold text-base mb-1.5" style={{ color: accentColor }}>
                {f.formula}
              </p>
              <p className="font-body text-sm text-muted leading-relaxed">{f.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
