import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
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

  const getItem = (id: number | null) =>
    id ? menuItems.find((m) => m.id === id) : null

  const handleExportExcel = () => {
    const rows = orders.map((order) => {
      const boisson = getItem(order.boisson_id)
      const entree = getItem(order.entree_id)
      const plat = getItem(order.plat_id)
      const dessert = getItem(order.dessert_id)
      return {
        Nom: order.guest_name,
        Boisson: boisson?.name ?? '',
        'Prix Boisson': boisson?.price ?? 0,
        Entree: entree?.name ?? '',
        'Prix Entree': entree?.price ?? 0,
        Plat: plat?.name ?? '',
        'Prix Plat': plat?.price ?? 0,
        Dessert: dessert?.name ?? '',
        'Prix Dessert': dessert?.price ?? 0,
        TOTAL: Number(order.total),
        Remarques: order.remarks ?? '',
      }
    })

    // Add total row
    const grandTotal = orders.reduce((sum, o) => sum + Number(o.total), 0)
    rows.push({
      Nom: 'TOTAL GENERAL',
      Boisson: '',
      'Prix Boisson': 0,
      Entree: '',
      'Prix Entree': 0,
      Plat: '',
      'Prix Plat': 0,
      Dessert: '',
      'Prix Dessert': 0,
      TOTAL: grandTotal,
      Remarques: `${orders.length} commandes`,
    })

    const ws = XLSX.utils.json_to_sheet(rows)

    // Set column widths
    ws['!cols'] = [
      { wch: 18 }, // Nom
      { wch: 35 }, // Boisson
      { wch: 10 }, // Prix Boisson
      { wch: 30 }, // Entree
      { wch: 10 }, // Prix Entree
      { wch: 40 }, // Plat
      { wch: 10 }, // Prix Plat
      { wch: 30 }, // Dessert
      { wch: 10 }, // Prix Dessert
      { wch: 10 }, // TOTAL
      { wch: 25 }, // Remarques
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Commandes Iftar')
    XLSX.writeFile(wb, `commandes_iftar_le_riad.xlsx`)
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

      {/* Action buttons */}
      <div className="px-4 mb-4 space-y-2">
        <button
          onClick={loadData}
          className="w-full py-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-300 text-sm font-medium hover:bg-gold-500/10 transition-all active:scale-[0.98]"
        >
          🔄 Rafraichir les commandes
        </button>
        {orders.length > 0 && (
          <button
            onClick={handleExportExcel}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold hover:from-emerald-500 hover:to-emerald-600 transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/25"
          >
            📥 Telecharger Excel pour le restaurant
          </button>
        )}
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
