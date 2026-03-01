export interface StoredSupplement {
  name: string
  price: number
  linkedTo: string
}

export function parseSupplements(remarks: string | null): {
  userRemarks: string
  supplements: StoredSupplement[]
} {
  if (!remarks) return { userRemarks: '', supplements: [] }

  const marker = '||SUPS::'
  const idx = remarks.indexOf(marker)
  if (idx === -1) return { userRemarks: remarks, supplements: [] }

  const userRemarks = remarks.substring(0, idx).trim()
  const jsonStr = remarks.substring(idx + marker.length)
  try {
    const supplements = JSON.parse(jsonStr) as StoredSupplement[]
    return { userRemarks, supplements }
  } catch {
    return { userRemarks: remarks, supplements: [] }
  }
}

export const CATEGORY_LABELS: Record<string, string> = {
  boisson: 'boisson',
  entree: 'entree',
  plat: 'plat',
  dessert: 'dessert',
}
