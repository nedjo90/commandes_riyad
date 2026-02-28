import Confetti from './Confetti'

interface Props {
  guestName: string
  total: number
  onClose: () => void
}

export default function SuccessOverlay({ guestName, total, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Confetti */}
      <Confetti />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm animate-success-pulse">
        <div className="recap-card rounded-2xl border border-gold-500/30 p-8 text-center">
          {/* Big checkmark */}
          <div className="text-6xl mb-4">✅</div>

          {/* Title */}
          <h2 className="font-display text-2xl font-bold text-gold-300 mb-2">
            Commande envoyee !
          </h2>

          {/* Arabic blessing */}
          <p className="font-arabic text-lg text-gold-400/70 mb-4">
            بارك الله فيك
          </p>

          {/* Details */}
          <div className="bg-night-900/50 rounded-xl p-4 mb-6">
            <p className="text-gold-200 font-medium text-lg">{guestName}</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {total.toFixed(2)} €
            </p>
          </div>

          {/* Turkish message */}
          <p className="text-night-300 text-sm mb-6">
            Hayirli iftarlar! 🌙
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-night-900 font-semibold hover:from-gold-400 hover:to-gold-500 active:scale-[0.97] transition-all"
          >
            Nouvelle commande
          </button>
        </div>
      </div>
    </div>
  )
}
