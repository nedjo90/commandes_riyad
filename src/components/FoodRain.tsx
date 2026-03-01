import { useMemo } from 'react'
import { FOOD_EMOJIS } from '../lib/fun'

export default function FoodRain() {
  const pieces = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
      left: Math.random() * 100,
      size: Math.random() * 16 + 18,
      fallDur: Math.random() * 2.5 + 2,
      delay: Math.random() * 1,
      rotation: Math.random() * 360,
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            '--fall-dur': `${p.fallDur}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  )
}
