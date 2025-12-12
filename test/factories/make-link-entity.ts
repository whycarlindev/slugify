import { Link } from '@/domain/links/enterprise/entities/link'

export function makeLinkEntity(overrides: Partial<Link> = {}) {
  const link = Link.create({
    slug: 'abc1234',
    originalUrl: 'https://example.com',
    clickCount: 0,
    isActive: true,
    expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    ...overrides,
  })

  return link
}
