import { Either, left, right } from '@/core/errors/either'
import { Link } from '../../enterprise/entities/link'
import { LinksRepository } from '../repositories/links-repository'
import { SlugInactiveError } from './errors/slug-inactive-error'
import SlugNotFoundError from './errors/slug-not-found-error'

type GetLinkByIdUseCaseInput = {
  id: string
}

type GetLinkByIdUseCaseOutput = Either<
  SlugNotFoundError,
  {
    link: Link
  }
>

export class GetLinkByIdUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({
    id,
  }: GetLinkByIdUseCaseInput): Promise<GetLinkByIdUseCaseOutput> {
    const link = await this.linksRepository.findById(id)

    if (!link) {
      return left(new SlugNotFoundError())
    }

    return right({
      link,
    })
  }
}
