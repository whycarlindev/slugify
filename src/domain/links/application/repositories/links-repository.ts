import { Link } from '../../enterprise/entities/link'

export interface LinksRepository {
  findBySlug(slug: string): Promise<Link | null>
  create(link: Link): Promise<void>
}
