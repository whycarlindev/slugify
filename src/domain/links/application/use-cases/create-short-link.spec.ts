import { makeLinkEntity } from 'test/factories/make-link-entity'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { Link } from '../../enterprise/entities/link'
import { CreateShortLinkUseCase } from './create-short-link'
import ExpirationDateMustBeFutureError from './errors/expiration-date-must-be-future-error'
import SlugAlreadyExistsError from './errors/slug-already-exists-error'

type TypedResult = { link: Link }

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: CreateShortLinkUseCase

describe('CreateShortLinkUseCase', () => {
  beforeEach(() => setup())

  it('should create a short link with a custom slug', async () => {
    const result = await sut.execute({
      customSlug: 'custom-slug',
      originalUrl: 'https://example.com',
    })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult

    expect(typedResult.link.slug).toBe('custom-slug')
    expect(typedResult.link.originalUrl).toBe('https://example.com')
  })

  it('should create a short link with a generated slug', async () => {
    const result = await sut.execute({
      originalUrl: 'https://example.com',
    })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult

    expect(typedResult.link.slug).toHaveLength(7)
    expect(typedResult.link.originalUrl).toBe('https://example.com')
  })

  it('should create a short link with a custom expiration date', async () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 10)

    const result = await sut.execute({
      originalUrl: 'https://example.com',
      expirationDate,
    })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult
    expect(typedResult.link.expirationDate).toEqual(expirationDate)
  })

  it('should not create a short link with an existing custom slug', async () => {
    const link = makeLinkEntity({
      slug: 'existing-slug',
      originalUrl: 'https://example.com',
      clickCount: 0,
      isActive: true,
    })

    await inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      customSlug: 'existing-slug',
      originalUrl: 'https://example.com/another',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SlugAlreadyExistsError)
  })

  it('should not create a short link with an expiration date in the past', async () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() - 1)

    const result = await sut.execute({
      originalUrl: 'https://example.com',
      expirationDate,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ExpirationDateMustBeFutureError)
  })
})

function setup() {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  sut = new CreateShortLinkUseCase(inMemoryLinksRepository)
}
