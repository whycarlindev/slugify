export type LinkPersistence = {
  id: string
  slug: string
  original_url: string
  expiration_date: Date
  click_count: number
  is_active: boolean
  created_at: Date
  updated_at: Date | null
}

export type LinkAccessPersistence = {
  id: string
  link_id: string
  accessed_at: Date
  ip_address: string
}

declare module 'knex/types/tables' {
  interface Tables {
    links: LinkPersistence
    link_accesses: LinkAccessPersistence
  }
}
