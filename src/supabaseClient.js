import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmyygcxhrjopdejnurqh.supabase.co'
const supabaseAnonKey = 'sb_publishable_QfH48LuxCr5pQPLx47Ir2Q_n7y5Gn4g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)