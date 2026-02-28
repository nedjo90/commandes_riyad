export default function Header() {
  return (
    <header className="relative overflow-hidden pt-8 pb-6 px-4 text-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-900/70 via-night-900/90 to-night-900" />

      {/* Content */}
      <div className="relative z-10">
        {/* Crescent & Lantern */}
        <div className="text-5xl mb-3 animate-float">🌙</div>

        {/* Title */}
        <h1 className="font-display text-3xl font-bold text-gold-300 mb-1">
          Iftar au Riad
        </h1>
        <p className="font-arabic text-xl text-gold-400/80 mb-3">
          بسم الله الرحمن الرحيم
        </p>

        {/* Subtitle */}
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5">
          <span className="text-sm">🇱🇺</span>
          <span className="text-sm text-gold-200 font-medium">
            Communaute Turque du Luxembourg
          </span>
        </div>

        {/* Restaurant info */}
        <p className="mt-3 text-night-300 text-sm">
          Restaurant Le Riad — Ramadan 2026
        </p>
      </div>
    </header>
  )
}
