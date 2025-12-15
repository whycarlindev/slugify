import { Link } from '@/domain/links/enterprise/entities/link'
import { UniqueEntityId } from '@/domain/links/enterprise/entities/value-objects/unique-entity-id'
import { LinkPersistence } from '../types'

export class LinkMapper {
  static toDomain({
    id,
    slug,
    original_url,
    expiration_date,
    click_count,
    is_active,
    created_at,
    updated_at,
  }: LinkPersistence): Link {
    return Link.create(
      {
        slug,
        originalUrl: original_url,
        expirationDate: expiration_date,
        clickCount: click_count,
        isActive: is_active,
        createdAt: created_at,
        updatedAt: updated_at,
      },
      new UniqueEntityId(id),
    )
  }

  static toPersistence({
    id,
    slug,
    originalUrl,
    expirationDate,
    clickCount,
    isActive,
    createdAt,
    updatedAt,
  }: Link): LinkPersistence {
    return {
      id,
      slug,
      original_url: originalUrl,
      expiration_date: expirationDate,
      click_count: clickCount,
      is_active: isActive,
      created_at: createdAt,
      updated_at: updatedAt,
    }
  }
}
