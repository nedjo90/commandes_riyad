import type { MenuItem } from '../types/database'
import { categoryIcons } from '../lib/menu'

interface Props {
  selections: Record<string, MenuItem | undefined>
  supplements: { name: string; price: number }[]
  total: number
}

export default function OrderRecap({ selections, supplements, total }: Props) {
  const items = Object.entries(selections).filter(
    ([, item]) => item && item.price > 0
  )
  const activeSups = supplements.filter((s) => s.price > 0)

  if (items.length === 0) return null

  return (
    <div className="recap-card rounded-xl border border-gold-500/20 p-4 animate-fade-in-scale">
      <h3 className="text-sm font-semibold text-gold-400 mb-3 flex items-center gap-2">
        <span>🧾</span> Votre selection
      </h3>
      <div className="space-y-2">
        {items.map(([cat, item]) => (
          <div key={cat} className="flex justify-between items-center text-sm">
            <span className="text-night-200 flex items-center gap-2">
              <span>{categoryIcons[cat]}</span>
              <span className="truncate max-w-[200px]">{item!.name}</span>
            </span>
            <span className="text-gold-400 font-medium whitespace-nowrap ml-2">
              {item!.price.toFixed(2)} €
            </span>
          </div>
        ))}
        {activeSups.map((sup) => (
          <div key={sup.name} className="flex justify-between items-center text-sm">
            <span className="text-night-300 flex items-center gap-2">
              <span>➕</span>
              <span className="truncate max-w-[200px]">{sup.name}</span>
            </span>
            <span className="text-gold-400/70 font-medium whitespace-nowrap ml-2">
              +{sup.price.toFixed(2)} €
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gold-500/15 flex justify-between items-center">
        <span className="text-gold-300 font-semibold text-sm">Total</span>
        <span className="text-xl font-bold text-gold-300">{total.toFixed(2)} €</span>
      </div>
    </div>
  )
}
