import { asClass, asFunction, Lifetime } from 'awilix'
import { FastifyInstance } from 'fastify'

import { CreateShortLinkUseCase } from '@/domain/links/application/use-cases/create-short-link'
import { EditOriginalUrlUseCase } from '@/domain/links/application/use-cases/edit-original-url'
import { GetLinkByIdUseCase } from '@/domain/links/application/use-cases/get-link-by-id'
import { GetLinkBySlugUseCase } from '@/domain/links/application/use-cases/get-link-by-slug'
import { MakeLinkInactiveUseCase } from '@/domain/links/application/use-cases/make-link-inactive'

import { db } from '../database/knex'
import { KnexLinkAccessesRepository } from '../database/repositories/knex-link-accesses-repository'
import { KnexLinksRepository } from '../database/repositories/knex-links-repository'

export function registerDependencies(app: FastifyInstance) {
  app.diContainer.register({
    db: asFunction(() => db, {
      lifetime: Lifetime.SINGLETON,
    }),

    linksRepository: asClass(KnexLinksRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    linkAccessesRepository: asClass(KnexLinkAccessesRepository, {
      lifetime: Lifetime.SINGLETON,
    }),

    createShortLinkUseCase: asClass(CreateShortLinkUseCase, {
      lifetime: Lifetime.SINGLETON,
    }),
    getLinkBySlugUseCase: asClass(GetLinkBySlugUseCase, {
      lifetime: Lifetime.SINGLETON,
    }),
    getLinkByIdUseCase: asClass(GetLinkByIdUseCase, {
      lifetime: Lifetime.SINGLETON,
    }),
    editOriginalUrlUseCase: asClass(EditOriginalUrlUseCase, {
      lifetime: Lifetime.SINGLETON,
    }),
    makeLinkInactiveUseCase: asClass(MakeLinkInactiveUseCase, {
      lifetime: Lifetime.SINGLETON,
    }),
  })
}
