export interface MenuItem {
  id: number
  category: 'boisson' | 'entree' | 'plat' | 'dessert'
  name: string
  price: number
}

export interface Order {
  id: number
  guest_name: string
  boisson_id: number | null
  entree_id: number | null
  plat_id: number | null
  dessert_id: number | null
  remarks: string | null
  total: number
  created_at: string
}

export interface OrderWithItems extends Order {
  boisson: MenuItem | null
  entree: MenuItem | null
  plat: MenuItem | null
  dessert: MenuItem | null
}

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: MenuItem
        Insert: Omit<MenuItem, 'id'>
        Update: Partial<Omit<MenuItem, 'id'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
    }
  }
}
