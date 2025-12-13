import { makeLinkEntity } from 'test/factories/make-link-entity'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { Link } from '../../enterprise/entities/link'
import SlugNotFoundError from './errors/slug-not-found-error'
import { GetLinkByIdUseCase } from './get-link-by-id'

type TypedResult = { link: Link }

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: GetLinkByIdUseCase

describe('GetLinkByIdUseCase', () => {
  beforeEach(() => setup())

  it('should retrieve a link by its id', async () => {
    const link = makeLinkEntity({
      slug: 'test-slug',
      originalUrl: 'https://example.com',
    })

    inMemoryLinksRepository.create(link)

    const result = await sut.execute({ id: link.id })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult

    expect(typedResult.link).toEqual(link)
  })

  it('should return SlugNotFoundError if the id does not exist', async () => {
    const result = await sut.execute({ id: 'non-existing-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SlugNotFoundError)
  })
})

function setup() {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new GetLinkByIdUseCase(inMemoryLinksRepository)
}
