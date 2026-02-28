export default function Lantern({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-4' : 'right-4'} lantern ${isLeft ? '' : 'lantern-delay'}`}
    >
      <svg width="32" height="56" viewBox="0 0 32 56" fill="none" className="drop-shadow-lg">
        {/* Hook */}
        <path d="M14 0 Q16 4 18 0" stroke="#d4911d" strokeWidth="1.5" fill="none" />
        <line x1="16" y1="2" x2="16" y2="10" stroke="#d4911d" strokeWidth="1" />
        {/* Top cap */}
        <path d="M10 10 L22 10 L20 14 L12 14 Z" fill="#b87016" />
        {/* Body */}
        <path d="M12 14 Q8 28 12 42 L20 42 Q24 28 20 14 Z" fill="url(#lanternGrad)" opacity="0.9" />
        {/* Inner glow */}
        <ellipse cx="16" cy="28" rx="4" ry="10" fill="#edc25c" opacity="0.5" />
        <ellipse cx="16" cy="28" rx="2" ry="6" fill="#f9edcc" opacity="0.6" />
        {/* Bottom cap */}
        <path d="M12 42 L20 42 L18 46 L14 46 Z" fill="#b87016" />
        {/* Tassel */}
        <line x1="16" y1="46" x2="16" y2="54" stroke="#d4911d" strokeWidth="1" />
        <circle cx="16" cy="55" r="1.5" fill="#d4911d" />
        <defs>
          <linearGradient id="lanternGrad" x1="16" y1="14" x2="16" y2="42">
            <stop offset="0%" stopColor="#e8ad35" />
            <stop offset="50%" stopColor="#d4911d" />
            <stop offset="100%" stopColor="#995216" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
