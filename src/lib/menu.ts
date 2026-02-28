import { supabase } from './supabase'
import type { MenuItem, Order } from '../types/database'

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('category')
    .order('price')
  if (error) throw error
  return (data as MenuItem[]) ?? []
}

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as Order[]) ?? []
}

export async function createOrder(order: {
  guest_name: string
  boisson_id: number | null
  entree_id: number | null
  plat_id: number | null
  dessert_id: number | null
  remarks: string | null
  total: number
}): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order as Record<string, unknown>)
    .select()
    .single()
  if (error) throw error
  return data as Order
}

export async function deleteOrder(id: number): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export function groupByCategory(items: MenuItem[]): Record<string, MenuItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)
}

export const categoryLabels: Record<string, string> = {
  boisson: 'Boissons',
  entree: 'Entrees',
  plat: 'Plats',
  dessert: 'Desserts',
}

export const categoryIcons: Record<string, string> = {
  boisson: '🥤',
  entree: '🥗',
  plat: '🍲',
  dessert: '🍨',
}
