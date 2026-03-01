import FoodRain from './FoodRain'
import { getFunTitle, getRandomBlessing } from '../lib/fun'
import { useMemo } from 'react'

interface Props {
  guestName: string
  total: number
  platName: string | undefined
  onClose: () => void
}

export default function SuccessOverlay({ guestName, total, platName, onClose }: Props) {
  const title = useMemo(() => getFunTitle(platName, total), [platName, total])
  const blessing = useMemo(() => getRandomBlessing(), [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Food Rain */}
      <FoodRain />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm animate-success-pulse">
        <div className="recap-card rounded-2xl border border-gold-500/30 p-8 text-center">
          {/* Big emoji */}
          <div className="text-6xl mb-3">🎉</div>

          {/* Fun title */}
          <div className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-night-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            {title}
          </div>

          {/* Name */}
          <h2 className="font-display text-2xl font-bold text-gold-300 mb-1">
            {guestName}
          </h2>
          <p className="text-night-400 text-sm mb-4">
            Ta commande est enregistree !
          </p>

          {/* Total */}
          <div className="bg-night-900/50 rounded-xl p-4 mb-5">
            <p className="text-3xl font-bold text-emerald-400">
              {total.toFixed(2)} €
            </p>
          </div>

          {/* Random blessing */}
          <div className="mb-5">
            <p className="font-arabic text-2xl text-gold-400 mb-1">
              {blessing.text}
            </p>
            <p className="text-night-400 text-xs">
              {blessing.lang} — {blessing.meaning}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-night-900 font-semibold hover:from-gold-400 hover:to-gold-500 active:scale-[0.97] transition-all text-base"
          >
            🌙 Nouvelle commande
          </button>
        </div>
      </div>
    </div>
  )
}
