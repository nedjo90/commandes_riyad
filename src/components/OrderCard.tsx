import type { MenuItem, Order } from '../types/database'
import { parseSupplements } from '../lib/supplements'

interface Props {
  order: Order
  menuItems: MenuItem[]
  onDelete: (id: number) => void
}

const CAT_EMOJI: Record<string, string> = {
  boisson: '🥤',
  entree: '🥗',
  plat: '🍲',
  dessert: '🍨',
}

export default function OrderCard({ order, menuItems, onDelete }: Props) {
  const getItem = (id: number | null) =>
    id ? menuItems.find((m) => m.id === id) : null

  const { userRemarks, supplements } = parseSupplements(order.remarks)

  const lines: { cat: string; item: MenuItem; sups: { name: string; price: number }[] }[] = []

  const pairs: [string, number | null][] = [
    ['boisson', order.boisson_id],
    ['entree', order.entree_id],
    ['plat', order.plat_id],
    ['dessert', order.dessert_id],
  ]

  for (const [cat, id] of pairs) {
    const item = getItem(id)
    if (!item || item.price === 0) continue
    const catSups = supplements.filter((s) => s.linkedTo === cat)
    lines.push({ cat, item, sups: catSups })
  }

  return (
    <div className="bg-night-800/60 border border-night-700/50 rounded-xl p-4 animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gold-300 text-lg">
            {order.guest_name}
          </h3>
          <p className="text-xs text-night-400">
            {new Date(order.created_at).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gold-400 text-lg">
            {Number(order.total).toFixed(2)} €
          </p>
          <button
            onClick={() => onDelete(order.id)}
            className="text-xs text-terracotta-400 hover:text-terracotta-300 mt-1"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        {lines.map(({ cat, item, sups }) => (
          <div key={cat}>
            <div className="flex justify-between text-night-300">
              <span>{CAT_EMOJI[cat]} {item.name}</span>
              <span className="text-night-400">{item.price.toFixed(2)} €</span>
            </div>
            {sups.map((sup, i) => (
              <div key={i} className="flex justify-between text-night-400 pl-6 text-xs">
                <span>↳ {sup.name}</span>
                <span>+{sup.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>
        ))}
        {userRemarks && (
          <div className="mt-2 pt-2 border-t border-night-700/50">
            <p className="text-night-400 text-xs italic">
              💬 {userRemarks}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
