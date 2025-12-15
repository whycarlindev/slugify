import { Knex } from 'knex'
import { LinkAccessesRepository } from '@/domain/links/application/repositories/link-accesses-repository'
import { LinksRepository } from '@/domain/links/application/repositories/links-repository'
import { CreateShortLinkUseCase } from '@/domain/links/application/use-cases/create-short-link'
import { EditOriginalUrlUseCase } from '@/domain/links/application/use-cases/edit-original-url'
import { GetLinkByIdUseCase } from '@/domain/links/application/use-cases/get-link-by-id'
import { GetLinkBySlugUseCase } from '@/domain/links/application/use-cases/get-link-by-slug'
import { MakeLinkInactiveUseCase } from '@/domain/links/application/use-cases/make-link-inactive'

export interface DIContainer {
  db: Knex
  linksRepository: LinksRepository
  linkAccessesRepository: LinkAccessesRepository
  createShortLinkUseCase: CreateShortLinkUseCase
  getLinkBySlugUseCase: GetLinkBySlugUseCase
  getLinkByIdUseCase: GetLinkByIdUseCase
  editOriginalUrlUseCase: EditOriginalUrlUseCase
  makeLinkInactiveUseCase: MakeLinkInactiveUseCase
}

declare module '@fastify/awilix' {
  interface Cradle extends DIContainer {}
}
