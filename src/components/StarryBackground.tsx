import { useMemo } from 'react'

export default function StarryBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      dur: Math.random() * 3 + 2,
      maxOp: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 3,
    }))
  }, [])

  return (
    <div className="starry-bg">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--max-op': s.maxOp,
            animationDelay: `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
