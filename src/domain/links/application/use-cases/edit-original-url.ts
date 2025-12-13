import { Either, left, right } from '@/core/errors/either'
import { Link } from '../../enterprise/entities/link'
import { LinksRepository } from '../repositories/links-repository'
import LinkNotFoundError from './errors/link-not-found-error'

type EditOriginalUrlUseCaseInput = {
  id: string
  newOriginalUrl: string
}

type EditOriginalUrlUseCaseOutput = Either<
  LinkNotFoundError,
  {
    link: Link
  }
>

export class EditOriginalUrlUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({
    id,
    newOriginalUrl,
  }: EditOriginalUrlUseCaseInput): Promise<EditOriginalUrlUseCaseOutput> {
    const link = await this.linksRepository.findById(id)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    link.originalUrl = newOriginalUrl

    await this.linksRepository.save(link)

    return right({
      link,
    })
  }
}
