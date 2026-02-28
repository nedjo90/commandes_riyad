import { useState, useEffect } from 'react'
import OrderCard from '../components/OrderCard'
import { fetchOrders, fetchMenuItems, deleteOrder } from '../lib/menu'
import type { MenuItem, Order } from '../types/database'

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const [o, m] = await Promise.all([fetchOrders(), fetchMenuItems()])
    setOrders(o)
    setMenuItems(m)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette commande ?')) return
    await deleteOrder(id)
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const grandTotal = orders.reduce((sum, o) => sum + Number(o.total), 0)

  return (
    <div className="min-h-screen moroccan-pattern pb-8">
      {/* Header */}
      <header className="px-4 pt-8 pb-6">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-gold-400 text-sm mb-4 hover:text-gold-300"
        >
          ← Retour au menu
        </a>
        <h1 className="font-display text-2xl font-bold text-gold-300">
          📋 Commandes
        </h1>
        <p className="text-night-400 text-sm mt-1">
          Toutes les commandes pour l'iftar
        </p>
      </header>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-night-800/60 border border-night-700/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gold-300">{orders.length}</p>
            <p className="text-xs text-night-400">Commandes</p>
          </div>
          <div className="bg-night-800/60 border border-night-700/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {grandTotal.toFixed(2)} €
            </p>
            <p className="text-xs text-night-400">Total general</p>
          </div>
        </div>
      </div>

      {/* Refresh */}
      <div className="px-4 mb-4">
        <button
          onClick={loadData}
          className="w-full py-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-300 text-sm font-medium hover:bg-gold-500/10 transition-all active:scale-[0.98]"
        >
          🔄 Rafraichir les commandes
        </button>
      </div>

      {/* Orders list */}
      <div className="px-4 space-y-3">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-3xl mb-3 animate-float">🌙</div>
            <p className="text-gold-300 animate-pulse">Chargement...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-night-400">Aucune commande pour l'instant</p>
            <p className="text-night-500 text-sm mt-1">
              Les commandes apparaitront ici
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              menuItems={menuItems}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
