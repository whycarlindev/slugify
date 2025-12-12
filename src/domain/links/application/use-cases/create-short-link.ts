import { nanoid } from 'nanoid'
import { Either, left, right } from '@/core/errors/either'
import { Link } from '../../enterprise/entities/link'
import { LinksRepository } from '../repositories/links-repository'
import ExpirationDateMustBeFutureError from './errors/expiration-date-must-be-future-error'
import SlugAlreadyExistsError from './errors/slug-already-exists-error'

type CreateShortLinkUseCaseInput = {
  customSlug?: string
  originalUrl: string
  expirationDate?: Date
}

type CreateShortLinkUseCaseOutput = Either<
  SlugAlreadyExistsError | ExpirationDateMustBeFutureError,
  {
    link: Link
  }
>

export class CreateShortLinkUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({
    customSlug,
    originalUrl,
    expirationDate,
  }: CreateShortLinkUseCaseInput): Promise<CreateShortLinkUseCaseOutput> {
    const slug = customSlug ?? nanoid(7)

    const existingLink = await this.linksRepository.findBySlug(slug)

    if (existingLink) {
      return left(new SlugAlreadyExistsError(slug))
    }

    if (expirationDate && expirationDate <= new Date()) {
      return left(new ExpirationDateMustBeFutureError(expirationDate))
    }

    const link = Link.create({
      slug,
      originalUrl,
      clickCount: 0,
      isActive: true,
      expirationDate,
    })

    await this.linksRepository.create(link)

    return right({
      link,
    })
  }
}
