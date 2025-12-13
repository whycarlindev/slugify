import { Either, left, right } from '@/core/errors/either'
import { Link } from '../../enterprise/entities/link'
import { LinkAccess } from '../../enterprise/entities/link-access'
import { LinkAccessesRepository } from '../repositories/link-accesses-repository'
import { LinksRepository } from '../repositories/links-repository'
import { SlugInactiveError } from './errors/slug-inactive-error'
import SlugNotFoundError from './errors/slug-not-found-error'

type GetLinkBySlugUseCaseInput = {
  slug: string
  accessIp: string
}

type GetLinkBySlugUseCaseOutput = Either<
  SlugNotFoundError | SlugInactiveError,
  {
    link: Link
  }
>

export class GetLinkBySlugUseCase {
  constructor(
    private readonly linksRepository: LinksRepository,
    private readonly linkAccessesRepository: LinkAccessesRepository,
  ) {}

  async execute({
    slug,
    accessIp,
  }: GetLinkBySlugUseCaseInput): Promise<GetLinkBySlugUseCaseOutput> {
    const link = await this.linksRepository.findBySlug(slug)

    if (!link) {
      return left(new SlugNotFoundError())
    }

    if (link.expirationDate <= new Date() || !link.isActive) {
      return left(new SlugInactiveError(slug))
    }

    link.addOneClick()

    const linkAccess = LinkAccess.create({
      linkId: link.id,
      accessedAt: new Date(),
      ipAddress: accessIp,
    })

    await Promise.all([
      this.linksRepository.save(link),
      this.linkAccessesRepository.create(linkAccess),
    ])

    return right({
      link,
    })
  }
}
