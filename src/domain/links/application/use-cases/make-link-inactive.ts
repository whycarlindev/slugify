import { Either, left, right } from '@/core/errors/either'
import { LinksRepository } from '../repositories/links-repository'
import LinkNotFoundError from './errors/link-not-found-error'

type MakeLinkInactiveUseCaseInput = {
  id: string
}

type MakeLinkInactiveUseCaseOutput = Either<LinkNotFoundError, {}>

export class MakeLinkInactiveUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({
    id,
  }: MakeLinkInactiveUseCaseInput): Promise<MakeLinkInactiveUseCaseOutput> {
    const link = await this.linksRepository.findById(id)

    if (!link) {
      return left(new LinkNotFoundError())
    }

    link.isActive = false

    await this.linksRepository.save(link)

    return right({})
  }
}
