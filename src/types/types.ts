export interface PageMeta {
  title: string
  description: string
  cardImage: string
}

export interface UserDetails {
  id: string /* primary key */
  full_name?: string
  avatar_url?: string
  billing_address?: any // type unknown;
  payment_method?: any // type unknown;
}
