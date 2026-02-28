import { useState, useEffect } from 'react'
import OrderPage from './pages/OrderPage'
import OrdersListPage from './pages/OrdersListPage'

function getRoute(): string {
  return window.location.hash.replace('#', '') || '/'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  switch (route) {
    case '/commandes':
      return <OrdersListPage />
    default:
      return <OrderPage />
  }
}
