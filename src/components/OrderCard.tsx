import type { MenuItem, Order } from '../types/database'

interface Props {
  order: Order
  menuItems: MenuItem[]
  onDelete: (id: number) => void
}

export default function OrderCard({ order, menuItems, onDelete }: Props) {
  const getItem = (id: number | null) =>
    id ? menuItems.find((m) => m.id === id) : null

  const boisson = getItem(order.boisson_id)
  const entree = getItem(order.entree_id)
  const plat = getItem(order.plat_id)
  const dessert = getItem(order.dessert_id)

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
            {order.total.toFixed(2)} €
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
        {boisson && boisson.price > 0 && (
          <div className="flex justify-between text-night-300">
            <span>🥤 {boisson.name}</span>
            <span className="text-night-400">{boisson.price.toFixed(2)} €</span>
          </div>
        )}
        {entree && entree.price > 0 && (
          <div className="flex justify-between text-night-300">
            <span>🥗 {entree.name}</span>
            <span className="text-night-400">{entree.price.toFixed(2)} €</span>
          </div>
        )}
        {plat && (
          <div className="flex justify-between text-night-300">
            <span>🍲 {plat.name}</span>
            <span className="text-night-400">{plat.price.toFixed(2)} €</span>
          </div>
        )}
        {dessert && dessert.price > 0 && (
          <div className="flex justify-between text-night-300">
            <span>🍨 {dessert.name}</span>
            <span className="text-night-400">{dessert.price.toFixed(2)} €</span>
          </div>
        )}
        {order.remarks && (
          <div className="mt-2 pt-2 border-t border-night-700/50">
            <p className="text-night-400 text-xs italic">
              💬 {order.remarks}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
