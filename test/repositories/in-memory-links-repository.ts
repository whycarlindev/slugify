import { LinksRepository } from '@/domain/links/application/repositories/links-repository'
import { Link } from '@/domain/links/enterprise/entities/link'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Link[] = []

  async findBySlug(slug: string) {
    const link = this.items.find((item) => item.slug === slug)
    return link || null
  }

  async create(link: Link) {
    this.items.push(link)
  }

  async save(link: Link) {
    const index = this.items.findIndex((item) => item.slug === link.slug)

    this.items[index] = link
  }

  async findById(id: string) {
    const link = this.items.find((item) => item.id === id)
    return link || null
  }
}
