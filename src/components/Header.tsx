import Lantern from './Lantern'

export default function Header() {
  return (
    <header className="relative overflow-hidden pt-6 pb-8 px-4 text-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0a08]/80 to-[#0c0a08]" />

      {/* Lanterns */}
      <Lantern side="left" />
      <Lantern side="right" />

      {/* Content */}
      <div className="relative z-10 pt-8">
        {/* Crescent with stars */}
        <div className="text-5xl mb-2 animate-float">🌙</div>

        {/* Arabic calligraphy */}
        <p className="font-arabic text-2xl text-gold-400/60 mb-2">
          بسم الله الرحمن الرحيم
        </p>

        {/* Title */}
        <h1 className="font-display text-3xl font-bold text-gold-300 mb-1 tracking-wide">
          Iftar au Riad
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="text-gold-500 text-xs">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>

        {/* Community badge */}
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-5 py-2">
          <span className="text-base">🇱🇺</span>
          <span className="text-sm text-gold-200 font-medium">
            Communaute Turque du Luxembourg
          </span>
        </div>

        {/* Restaurant info */}
        <p className="mt-3 text-night-400 text-xs tracking-widest uppercase">
          Restaurant Le Riad — Ramadan 2026
        </p>
      </div>
    </header>
  )
}
