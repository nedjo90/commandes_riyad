interface Props {
  total: number
  itemCount: number
  onSubmit: () => void
  disabled: boolean
  loading: boolean
}

export default function OrderSummaryBar({
  total,
  itemCount,
  onSubmit,
  disabled,
  loading,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-night-900/95 backdrop-blur-md border-t border-gold-500/20 p-4 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-night-400">
            {itemCount} article{itemCount > 1 ? 's' : ''} selectionne
            {itemCount > 1 ? 's' : ''}
          </p>
          <p className="text-xl font-bold text-gold-300">
            {total.toFixed(2)} €
          </p>
        </div>
        <button
          onClick={onSubmit}
          disabled={disabled || loading}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
            ${
              disabled
                ? 'bg-night-700 text-night-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold-500 to-gold-600 text-night-900 hover:from-gold-400 hover:to-gold-500 active:scale-[0.97] shadow-lg shadow-gold-500/25'
            }
          `}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Envoi...
            </span>
          ) : (
            'Valider ma commande'
          )}
        </button>
      </div>
    </div>
  )
}
