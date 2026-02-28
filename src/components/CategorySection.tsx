import type { MenuItem } from '../types/database'
import { categoryLabels, categoryIcons } from '../lib/menu'
import MenuItemCard from './MenuItemCard'

interface Props {
  category: string
  items: MenuItem[]
  selectedId: number | null
  onSelect: (item: MenuItem) => void
}

export default function CategorySection({
  category,
  items,
  selectedId,
  onSelect,
}: Props) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-xl">{categoryIcons[category]}</span>
        <h2 className="font-display text-lg font-semibold text-gold-300">
          {categoryLabels[category]}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
      </div>
      <div className="space-y-2 stagger-children">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
