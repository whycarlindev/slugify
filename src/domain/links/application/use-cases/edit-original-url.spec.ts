import { makeLinkEntity } from 'test/factories/make-link-entity'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { Link } from '../../enterprise/entities/link'
import { EditOriginalUrlUseCase } from './edit-original-url'
import LinkNotFoundError from './errors/link-not-found-error'

type TypedResult = { link: Link }

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: EditOriginalUrlUseCase

describe('EditOriginalUrlUseCase', () => {
  beforeEach(() => setup())

  it('should edit the original url of a link', async () => {
    const link = makeLinkEntity({
      slug: 'test-slug',
      originalUrl: 'https://example.com',
    })

    await inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      id: link.id,
      newOriginalUrl: 'https://new-example.com',
    })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult

    expect(typedResult.link.originalUrl).toBe('https://new-example.com')
  })

  it('should return LinkNotFoundError if the link does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
      newOriginalUrl: 'https://new-example.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})

function setup() {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new EditOriginalUrlUseCase(inMemoryLinksRepository)
}
