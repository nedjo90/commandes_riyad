// Fun titles based on order content
const TAJINE_TITLES = [
  'Sultan du Tajine',
  'Maitre des Epices',
  'Prince du Tajine Royal',
  'Grand Vizir du Tajine',
  'Gardien du Tajine Sacre',
]

const COUSCOUS_TITLES = [
  'Roi du Couscous',
  'Empereur de la Semoule',
  'Sultan du Couscous Royal',
  'Seigneur du Vendredi',
  'Champion du Couscous',
]

const GRILLADE_TITLES = [
  'Chevalier des Braises',
  'Maitre du Mechoui',
  'Seigneur des Grillades',
  'Gardien de la Flamme',
  'Roi du Barbecue',
]

const RIZ_TITLES = [
  'Prince du Riz Parfume',
  'Ambassadeur du Riz',
  'Maitre du Riz d\'Orient',
]

const GENERIC_TITLES = [
  'Grand Gourmet du Riad',
  'Explorateur du Palais',
  'Ambassadeur des Saveurs',
  'Fin Connaisseur du Riad',
  'VIP du Riad',
  'Legende du Riad',
  'Boss du Iftar',
]

const BIG_SPENDER_TITLES = [
  'Le Genereux du Riad',
  'Philanthrope du Iftar',
  'Le Magnifique',
  'Sultan du Festin',
]

export function getFunTitle(platName: string | undefined, total: number): string {
  if (total > 40) {
    return pick(BIG_SPENDER_TITLES)
  }
  if (!platName) return pick(GENERIC_TITLES)

  const lower = platName.toLowerCase()
  if (lower.includes('tajine') || lower.includes('tanjia')) return pick(TAJINE_TITLES)
  if (lower.includes('couscous')) return pick(COUSCOUS_TITLES)
  if (lower.includes('grill') || lower.includes('mechoui') || lower.includes('brochette') || lower.includes('cote')) return pick(GRILLADE_TITLES)
  if (lower.includes('riz')) return pick(RIZ_TITLES)
  return pick(GENERIC_TITLES)
}

// Blessings in Turkish and Arabic
const BLESSINGS = [
  { text: 'Afiyet olsun!', lang: '🇹🇷 Turc', meaning: 'Bon appetit !' },
  { text: 'Hayirli iftarlar!', lang: '🇹🇷 Turc', meaning: 'Bon iftar !' },
  { text: 'Ellerine saglik!', lang: '🇹🇷 Turc', meaning: 'Merci pour ce bon repas !' },
  { text: 'Allah kabul etsin!', lang: '🇹🇷 Turc', meaning: 'Que Dieu accepte !' },
  { text: 'Bereketli olsun!', lang: '🇹🇷 Turc', meaning: 'Que ce soit abondant !' },
  { text: 'بالصحة والعافية', lang: '🇲🇦 Arabe', meaning: 'A la sante !' },
  { text: 'الله يبارك', lang: '🇲🇦 Arabe', meaning: 'Que Dieu benisse !' },
  { text: 'تقبل الله', lang: '🇲🇦 Arabe', meaning: 'Que Dieu accepte !' },
]

export function getRandomBlessing() {
  return pick(BLESSINGS)
}

// Food emojis for the rain
export const FOOD_EMOJIS = [
  '🍲', '🥘', '🥗', '🍨', '🥤', '☕', '🍵',
  '🌙', '⭐', '✨', '🕌', '🏮', '🫖', '🍯',
  '🥙', '🧆', '🫓', '🍊', '🌶️', '🫒',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
