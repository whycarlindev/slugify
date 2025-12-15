import { Knex } from 'knex'
import { LinksRepository } from '@/domain/links/application/repositories/links-repository'
import { Link } from '@/domain/links/enterprise/entities/link'
import { LinkMapper } from '../mappers/link-mapper'

export class KnexLinksRepository implements LinksRepository {
  constructor(private readonly db: Knex) {}

  async findBySlug(slug: string) {
    const link = await this.db('links').where({ slug }).first()

    if (!link) {
      return null
    }

    return LinkMapper.toDomain(link)
  }

  async findById(id: string) {
    const link = await this.db('links').where({ id }).first()

    if (!link) {
      return null
    }

    return LinkMapper.toDomain(link)
  }

  async create(link: Link) {
    const data = LinkMapper.toPersistence(link)

    await this.db('links').insert(data)
  }

  async save(link: Link) {
    const data = LinkMapper.toPersistence(link)

    await this.db('links').where({ id: data.id }).update({
      original_url: data.original_url,
      click_count: data.click_count,
      is_active: data.is_active,
      updated_at: data.updated_at,
    })
  }
}
