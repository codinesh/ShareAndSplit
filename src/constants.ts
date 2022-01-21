import { createClient } from '@supabase/supabase-js'

class Constants {
  baseApiUrl = process.env.NEXT_PUBLIC_API_HOST
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // baseApiUrl='https://phmsapi.azurewebsites.net/api/'
  supabase = createClient(this.supabaseUrl ?? '', this.supabaseAnonKey ?? '')
}

const constants = new Constants()
export default constants
