interface Props {
  streak: number
}

export default function StreakCard({ streak }: Props) {
  return (
    <div className="bg-accent rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
          🔥
        </div>
        <div>
          <p className="font-display font-bold text-white text-lg">{streak} Day Streak!</p>
          <p className="font-body text-white/75 text-sm">Keep going — you&apos;re on fire</p>
        </div>
      </div>
      <div className="flex gap-1.5">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i < (streak % 7 === 0 && streak > 0 ? 7 : streak % 7)
                ? 'bg-white'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
