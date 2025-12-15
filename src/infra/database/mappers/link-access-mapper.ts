import { LinkAccess } from '@/domain/links/enterprise/entities/link-access'
import { UniqueEntityId } from '@/domain/links/enterprise/entities/value-objects/unique-entity-id'
import { LinkAccessPersistence } from '../types'

export class LinkAccessMapper {
  static toDomain(raw: LinkAccessPersistence): LinkAccess {
    return LinkAccess.create(
      {
        linkId: raw.link_id,
        accessedAt: raw.accessed_at,
        ipAddress: raw.ip_address,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(linkAccess: LinkAccess): LinkAccessPersistence {
    return {
      id: linkAccess.id.toString(),
      link_id: linkAccess.linkId,
      accessed_at: linkAccess.accessedAt,
      ip_address: linkAccess.ipAddress,
    }
  }
}
