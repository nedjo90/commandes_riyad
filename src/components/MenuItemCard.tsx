import type { MenuItem } from '../types/database'

interface Props {
  item: MenuItem
  selected: boolean
  onSelect: (item: MenuItem) => void
}

export default function MenuItemCard({ item, selected, onSelect }: Props) {
  const isNone = item.price === 0

  return (
    <button
      onClick={() => onSelect(item)}
      className={`w-full text-left rounded-xl p-3 transition-all duration-200 border
        ${
          selected
            ? 'bg-gold-500/20 border-gold-400 shadow-lg shadow-gold-500/10'
            : 'bg-night-800/50 border-night-700/50 hover:border-gold-500/30 hover:bg-night-800/80'
        }
        ${isNone ? 'opacity-60' : ''}
        active:scale-[0.98]
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm leading-tight ${
            selected ? 'text-gold-200 font-medium' : 'text-night-200'
          }`}
        >
          {item.name}
        </span>
        <span
          className={`text-sm font-semibold whitespace-nowrap ${
            selected ? 'text-gold-400' : 'text-night-400'
          } ${isNone ? 'text-emerald-500' : ''}`}
        >
          {isNone ? 'Gratuit' : `${item.price.toFixed(2)} €`}
        </span>
      </div>
      {selected && (
        <div className="mt-1 flex justify-end">
          <span className="text-xs text-gold-400">✓ Selectionne</span>
        </div>
      )}
    </button>
  )
}
