import { LinkAccessesRepository } from '@/domain/links/application/repositories/link-accesses-repository'
import { LinkAccess } from '@/domain/links/enterprise/entities/link-access'

export class InMemoryLinkAccessesRepository implements LinkAccessesRepository {
  public items: LinkAccess[] = []

  async create(linkAccess: LinkAccess): Promise<void> {
    this.items.push(linkAccess)
  }
}
