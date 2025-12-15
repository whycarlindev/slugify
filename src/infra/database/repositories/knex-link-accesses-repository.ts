import { Knex } from 'knex'
import { LinkAccessesRepository } from '@/domain/links/application/repositories/link-accesses-repository'
import { LinkAccess } from '@/domain/links/enterprise/entities/link-access'
import { LinkAccessMapper } from '../mappers/link-access-mapper'

export class KnexLinkAccessesRepository implements LinkAccessesRepository {
  constructor(private readonly db: Knex) {}

  async create(linkAccess: LinkAccess): Promise<void> {
    const data = LinkAccessMapper.toPersistence(linkAccess)

    await this.db('link_accesses').insert(data)
  }
}
