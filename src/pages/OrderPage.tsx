import { useState, useEffect } from 'react'
import Header from '../components/Header'
import StarryBackground from '../components/StarryBackground'
import OrderRecap from '../components/OrderRecap'
import OrderSummaryBar from '../components/OrderSummaryBar'
import SuccessOverlay from '../components/SuccessOverlay'
import { fetchMenuItems, createOrder, groupByCategory, categoryLabels, categoryIcons } from '../lib/menu'
import type { MenuItem } from '../types/database'

const CATEGORY_ORDER = ['boisson', 'entree', 'plat', 'dessert'] as const

// Supplements linked to categories
const SUPPLEMENTS = [
  { key: 'sup_sirop', label: 'Supplement sirop', price: 1.00, linkedTo: 'boisson' },
  { key: 'sup_garnitures', label: 'Supplement garnitures', price: 2.00, linkedTo: 'plat' },
  { key: 'sup_fruits_mer', label: 'Supplement fruits de mer', price: 3.50, linkedTo: 'plat' },
  { key: 'sup_viande', label: 'Supplement viande au choix', price: 3.50, linkedTo: 'plat' },
  { key: 'sup_couscous', label: 'Supplement couscous', price: 2.40, linkedTo: 'plat' },
  { key: 'sup_legumes', label: 'Supplement legumes', price: 3.20, linkedTo: 'plat' },
  { key: 'sup_miel_amandes', label: 'Supplement miel-amandes', price: 2.00, linkedTo: 'dessert' },
]

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<{ name: string; total: number; platName: string | undefined } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [guestName, setGuestName] = useState('')
  const [selections, setSelections] = useState<Record<string, number | null>>({
    boisson: null, entree: null, plat: null, dessert: null,
  })
  const [activeSups, setActiveSups] = useState<Record<string, boolean>>({})
  const [remarks, setRemarks] = useState('')

  useEffect(() => {
    fetchMenuItems()
      .then(setMenuItems)
      .catch(() => setError('Impossible de charger le menu'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = groupByCategory(menuItems)

  const handleSelect = (category: string, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value ? Number(value) : null }))
  }

  const toggleSup = (key: string) => {
    setActiveSups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getSelectedItem = (category: string): MenuItem | undefined => {
    const id = selections[category]
    if (!id) return undefined
    return menuItems.find((m) => m.id === id)
  }

  const selectedItems = CATEGORY_ORDER
    .map((cat) => getSelectedItem(cat))
    .filter((m): m is MenuItem => !!m)

  const supplementsTotal = SUPPLEMENTS
    .filter((s) => activeSups[s.key])
    .reduce((sum, s) => sum + s.price, 0)

  const total = Math.round((selectedItems.reduce((sum, item) => sum + item.price, 0) + supplementsTotal) * 100) / 100
  const itemCount = selectedItems.filter((i) => i.price > 0).length

  const canSubmit = guestName.trim().length > 0 && selectedItems.length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)

    // Build supplements JSON + user remarks
    const selectedSups = SUPPLEMENTS
      .filter((s) => activeSups[s.key])
      .map((s) => ({ name: s.label, price: s.price, linkedTo: s.linkedTo }))
    const supsJson = selectedSups.length > 0 ? JSON.stringify(selectedSups) : ''
    const fullRemarks = [remarks.trim(), supsJson ? `||SUPS::${supsJson}` : ''].filter(Boolean).join('')

    try {
      await createOrder({
        guest_name: guestName.trim(),
        boisson_id: selections.boisson,
        entree_id: selections.entree,
        plat_id: selections.plat,
        dessert_id: selections.dessert,
        remarks: fullRemarks || null,
        total,
      })
      setSuccessData({ name: guestName.trim(), total, platName: getSelectedItem('plat')?.name })
      setGuestName('')
      setSelections({ boisson: null, entree: null, plat: null, dessert: null })
      setActiveSups({})
      setRemarks('')
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarryBackground />
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-4 animate-float">🌙</div>
          <p className="text-gold-300 animate-pulse font-display text-lg">Chargement du menu...</p>
        </div>
      </div>
    )
  }

  // Supplements relevant to current selections
  const visibleSups = SUPPLEMENTS.filter((s) => {
    const item = getSelectedItem(s.linkedTo)
    return item && item.price > 0
  })

  const recapSelections: Record<string, MenuItem | undefined> = {}
  CATEGORY_ORDER.forEach((cat) => { recapSelections[cat] = getSelectedItem(cat) })

  const recapSups = SUPPLEMENTS
    .filter((s) => activeSups[s.key])
    .map((s) => ({ name: s.label, price: s.price }))

  return (
    <div className="min-h-screen pb-28">
      <StarryBackground />
      <div className="relative z-10 moroccan-pattern">
        <Header />

        {/* Nav to orders */}
        <div className="px-4 mb-5">
          <a
            href="#/commandes"
            className="block w-full text-center py-2.5 rounded-xl border border-gold-500/15 bg-gold-500/5 text-gold-400 text-sm font-medium hover:bg-gold-500/10 transition-all"
          >
            📋 Voir toutes les commandes →
          </a>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-4 mb-4 p-3 rounded-xl bg-terracotta-600/20 border border-terracotta-500/30 text-terracotta-300 text-sm text-center animate-slide-down">
            ❌ {error}
          </div>
        )}

        {/* Guest name */}
        <div className="px-4 mb-5">
          <label className="block text-sm text-gold-300 font-medium mb-2">
            ✍️ Votre nom *
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Entrez votre nom..."
            className="w-full bg-night-800/40 border border-night-700/40 rounded-xl px-4 py-3.5 text-gold-100 placeholder-night-500 focus:outline-none focus:border-gold-500/40 dropdown-glow transition-all text-base"
          />
        </div>

        {/* Category dropdowns */}
        <div className="px-4 space-y-5">
          {CATEGORY_ORDER.map((cat) => {
            const items = grouped[cat] ?? []
            const selected = getSelectedItem(cat)
            const catSups = visibleSups.filter((s) => s.linkedTo === cat)

            return (
              <div key={cat} className="animate-fade-in-up">
                <label className="flex items-center gap-2 text-sm text-gold-300 font-medium mb-2">
                  <span className="text-xl">{categoryIcons[cat]}</span>
                  <span>{categoryLabels[cat]}</span>
                  {selected && selected.price > 0 && (
                    <span className="ml-auto bg-gold-500/15 text-gold-400 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {selected.price.toFixed(2)} €
                    </span>
                  )}
                </label>
                <select
                  value={selections[cat] ?? ''}
                  onChange={(e) => handleSelect(cat, e.target.value)}
                  className="w-full bg-night-800/40 border border-night-700/40 rounded-xl px-4 py-3.5 text-gold-100 focus:outline-none focus:border-gold-500/40 dropdown-glow transition-all appearance-none text-base"
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
                    <option key={item.id} value={item.id} className="bg-night-900 text-gold-100">
                      {item.name} — {item.price === 0 ? 'Aucun' : `${item.price.toFixed(2)} €`}
                    </option>
                  ))}
                </select>

                {/* Supplements for this category */}
                {catSups.length > 0 && (
                  <div className="mt-2 space-y-1.5 pl-1">
                    {catSups.map((sup) => (
                      <label key={sup.key} onClick={() => toggleSup(sup.key)} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                          ${activeSups[sup.key]
                            ? 'bg-gold-500 border-gold-500'
                            : 'border-night-600 group-hover:border-gold-500/50'}`}
                        >
                          {activeSups[sup.key] && (
                            <svg className="w-3 h-3 text-night-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-night-300 group-hover:text-night-200 flex-1">{sup.label}</span>
                        <span className="text-xs text-gold-500/70 font-medium">+{sup.price.toFixed(2)} €</span>
                      </label>
                    ))}
                  </div>
                )}
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
            className="w-full bg-night-800/40 border border-night-700/40 rounded-xl px-4 py-3 text-gold-100 placeholder-night-500 focus:outline-none focus:border-gold-500/40 dropdown-glow transition-all resize-none text-base"
          />
        </div>

        {/* Order Recap */}
        {itemCount > 0 && (
          <div className="px-4 mt-5">
            <OrderRecap
              selections={recapSelections}
              supplements={recapSups}
              total={total}
            />
          </div>
        )}

        {/* Bottom bar */}
        <OrderSummaryBar
          total={total}
          itemCount={itemCount}
          onSubmit={handleSubmit}
          disabled={!canSubmit}
          loading={submitting}
        />

        {/* Success overlay */}
        {successData && (
          <SuccessOverlay
            guestName={successData.name}
            total={successData.total}
            platName={successData.platName}
            onClose={() => setSuccessData(null)}
          />
        )}
      </div>
    </div>
  )
}
