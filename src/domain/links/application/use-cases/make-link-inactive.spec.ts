import { makeLinkEntity } from 'test/factories/make-link-entity'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import LinkNotFoundError from './errors/link-not-found-error'
import { MakeLinkInactiveUseCase } from './make-link-inactive'

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: MakeLinkInactiveUseCase

describe('MakeLinkInactiveUseCase', () => {
  beforeEach(() => setup())

  it('should make a link inactive', async () => {
    const link = makeLinkEntity({
      slug: 'active-link',
      originalUrl: 'https://example.com',
    })

    await inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      id: link.id,
    })

    expect(result.isRight()).toBe(true)

    const updatedLink = await inMemoryLinksRepository.findById(link.id)

    expect(updatedLink.isActive).toBe(false)
  })

  it('should return LinkNotFoundError if the link does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})

function setup() {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new MakeLinkInactiveUseCase(inMemoryLinksRepository)
}
