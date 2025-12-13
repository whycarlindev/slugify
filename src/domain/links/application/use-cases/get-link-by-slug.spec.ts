import { makeLinkEntity } from 'test/factories/make-link-entity'
import { InMemoryLinkAccessesRepository } from 'test/repositories/in-memory-link-accesses-repository'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { Link } from '../../enterprise/entities/link'
import { SlugInactiveError } from './errors/slug-inactive-error'
import SlugNotFoundError from './errors/slug-not-found-error'
import { GetLinkBySlugUseCase } from './get-link-by-slug'

type TypedResult = { link: Link }

let inMemoryLinksRepository: InMemoryLinksRepository
let inMemoryLinkAccessesRepository: InMemoryLinkAccessesRepository
let sut: GetLinkBySlugUseCase

describe('GetLinkBySlugUseCase', () => {
  beforeEach(() => setup())

  it('should retrieve a link by its slug', async () => {
    const link = makeLinkEntity({
      slug: 'test-slug',
      originalUrl: 'https://example.com',
    })

    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      slug: 'test-slug',
      accessIp: '127.0.0.1',
    })

    expect(result.isRight()).toBe(true)

    const typedResult = result.value as TypedResult

    expect(typedResult.link).toEqual(link)
    expect(typedResult.link.clickCount).toBe(1)
  })

  it('should increment the click count each time the link is retrieved', async () => {
    const link = makeLinkEntity({
      slug: 'click-count-slug',
      originalUrl: 'https://example.com',
    })

    inMemoryLinksRepository.create(link)

    await sut.execute({ slug: 'click-count-slug', accessIp: '127.0.0.1' })
    const secondResult = await sut.execute({
      slug: 'click-count-slug',
      accessIp: '127.0.0.12',
    })

    expect(secondResult.isRight()).toBe(true)

    const typedResult = secondResult.value as TypedResult

    expect(typedResult.link.clickCount).toBe(2)
  })

  it('should record link access with the correct IP address', async () => {
    const link = makeLinkEntity({
      slug: 'access-record-slug',
      originalUrl: 'https://example.com',
    })

    inMemoryLinksRepository.create(link)

    await sut.execute({ slug: 'access-record-slug', accessIp: '127.0.0.1' })
    await sut.execute({ slug: 'access-record-slug', accessIp: '127.0.0.2' })

    expect(inMemoryLinkAccessesRepository.items).toHaveLength(2)

    expect(inMemoryLinkAccessesRepository.items[0].linkId).toBe(link.id)
    expect(inMemoryLinkAccessesRepository.items[0].ipAddress).toBe('127.0.0.1')

    expect(inMemoryLinkAccessesRepository.items[1].linkId).toBe(link.id)
    expect(inMemoryLinkAccessesRepository.items[1].ipAddress).toBe('127.0.0.2')
  })

  it('should return SlugNotFoundError if the slug does not exist', async () => {
    const result = await sut.execute({
      slug: 'non-existing-slug',
      accessIp: '127.0.0.1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SlugNotFoundError)
  })

  it('should return SlugInactiveError if the slug is inactive', async () => {
    const link = makeLinkEntity({
      slug: 'inactive-slug',
      originalUrl: 'https://example.com',
      isActive: false,
    })

    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      slug: 'inactive-slug',
      accessIp: '127.0.0.1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SlugInactiveError)
  })

  it('should return SlugInactiveError if the slug is expired', async () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() - 1)

    const link = makeLinkEntity({
      slug: 'expired-slug',
      originalUrl: 'https://example.com',
      expirationDate,
    })

    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      slug: 'expired-slug',
      accessIp: '127.0.0.1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SlugInactiveError)
  })
})

function setup() {
  inMemoryLinksRepository = new InMemoryLinksRepository()
  inMemoryLinkAccessesRepository = new InMemoryLinkAccessesRepository()

  sut = new GetLinkBySlugUseCase(
    inMemoryLinksRepository,
    inMemoryLinkAccessesRepository,
  )
}
