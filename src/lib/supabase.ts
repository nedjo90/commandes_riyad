import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://admmymnhznipfuuvcems.supabase.co'
const supabaseAnonKey = 'sb_publishable_34zeNPB2Wd1eZRkkiR3XTQ_V02UyAlP'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
