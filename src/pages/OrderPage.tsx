import { useState, useEffect } from 'react'
import Header from '../components/Header'
import OrderSummaryBar from '../components/OrderSummaryBar'
import { fetchMenuItems, createOrder, groupByCategory, categoryLabels, categoryIcons } from '../lib/menu'
import type { MenuItem } from '../types/database'

const CATEGORY_ORDER = ['boisson', 'entree', 'plat', 'dessert'] as const

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [guestName, setGuestName] = useState('')
  const [selections, setSelections] = useState<Record<string, number | null>>({
    boisson: null,
    entree: null,
    plat: null,
    dessert: null,
  })
  const [remarks, setRemarks] = useState('')

  useEffect(() => {
    fetchMenuItems()
      .then(setMenuItems)
      .catch(() => setError('Impossible de charger le menu'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = groupByCategory(menuItems)

  const handleSelect = (category: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: value ? Number(value) : null,
    }))
  }

  const getSelectedItem = (category: string): MenuItem | undefined => {
    const id = selections[category]
    if (!id) return undefined
    return menuItems.find((m) => m.id === id)
  }

  const selectedItems = CATEGORY_ORDER
    .map((cat) => getSelectedItem(cat))
    .filter((m): m is MenuItem => !!m)

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const itemCount = selectedItems.filter((i) => i.price > 0).length

  const canSubmit = guestName.trim().length > 0 && selectedItems.length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    try {
      await createOrder({
        guest_name: guestName.trim(),
        boisson_id: selections.boisson,
        entree_id: selections.entree,
        plat_id: selections.plat,
        dessert_id: selections.dessert,
        remarks: remarks.trim() || null,
        total,
      })
      setSuccess(true)
      setGuestName('')
      setSelections({ boisson: null, entree: null, plat: null, dessert: null })
      setRemarks('')
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">🌙</div>
          <p className="text-gold-300 animate-pulse">Chargement du menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen moroccan-pattern pb-28">
      <Header />

      {/* Navigation to orders */}
      <div className="px-4 mb-4">
        <a
          href="#/commandes"
          className="block w-full text-center py-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-300 text-sm font-medium hover:bg-gold-500/10 transition-all"
        >
          📋 Voir toutes les commandes →
        </a>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm text-center animate-fade-in-up">
          ✅ Commande envoyee avec succes ! Hayirli iftarlar!
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-terracotta-600/20 border border-terracotta-500/30 text-terracotta-300 text-sm text-center">
          ❌ {error}
        </div>
      )}

      {/* Guest name input */}
      <div className="px-4 mb-5">
        <label className="block text-sm text-gold-300 font-medium mb-2">
          Votre nom *
        </label>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Entrez votre nom..."
          className="w-full bg-night-800/60 border border-night-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder-night-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-all"
        />
      </div>

      {/* Category dropdowns */}
      <div className="px-4 space-y-4">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat] ?? []
          const selected = getSelectedItem(cat)
          return (
            <div key={cat}>
              <label className="flex items-center gap-2 text-sm text-gold-300 font-medium mb-2">
                <span className="text-lg">{categoryIcons[cat]}</span>
                {categoryLabels[cat]}
                {selected && selected.price > 0 && (
                  <span className="ml-auto text-gold-400 font-semibold">
                    {selected.price.toFixed(2)} €
                  </span>
                )}
                {selected && selected.price === 0 && (
                  <span className="ml-auto text-emerald-500 text-xs">Aucun</span>
                )}
              </label>
              <select
                value={selections[cat] ?? ''}
                onChange={(e) => handleSelect(cat, e.target.value)}
                className="w-full bg-night-800/60 border border-night-700/50 rounded-xl px-4 py-3 text-gold-100 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-all appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d4911d' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                <option value="" className="bg-night-900 text-night-400">
                  -- Choisir --
                </option>
                {items.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="bg-night-900 text-gold-100"
                  >
                    {item.name} — {item.price === 0 ? 'Gratuit' : `${item.price.toFixed(2)} €`}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>

      {/* Remarks */}
      <div className="px-4 mt-5">
        <label className="block text-sm text-gold-300 font-medium mb-2">
          💬 Remarques (allergies, preferences...)
        </label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Optionnel..."
          rows={2}
          className="w-full bg-night-800/60 border border-night-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder-night-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-all resize-none"
        />
      </div>

      {/* Bottom bar */}
      <OrderSummaryBar
        total={total}
        itemCount={itemCount}
        onSubmit={handleSubmit}
        disabled={!canSubmit}
        loading={submitting}
      />
    </div>
  )
}
