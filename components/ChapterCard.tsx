import { SUBJECT_COLORS, timeAgo } from '../lib/mockData'
import type { HistoryItem } from '../types'

interface Props {
  item: HistoryItem
  onClick: () => void
}

const MODE_LABELS: Record<string, string> = {
  quick: '⚡ Quick',
  deep: '📚 Deep',
  last_night: '🌙 Last Night',
}

export default function ChapterCard({ item, onClick }: Props) {
  const color = SUBJECT_COLORS[item.subject] ?? '#378ADD'

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-44 bg-white rounded-2xl p-4 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left"
    >
      <div
        className="w-2 h-2 rounded-full mb-3"
        style={{ backgroundColor: color }}
      />
      <p className="font-display font-bold text-sm text-ink leading-snug mb-3 line-clamp-2">{item.chapterName}</p>
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-display font-bold px-2 py-1 rounded-lg"
          style={{ color, backgroundColor: color + '18' }}
        >
          {item.subject}
        </span>
        <span className="text-[10px] font-body text-light">{timeAgo(item.revisedAt)}</span>
      </div>
    </button>
  )
}
