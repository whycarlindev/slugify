import { FastifyInstance } from 'fastify'
import { CreateShortLinkController } from '../controllers/create-short-link-controller'
import { EditOriginalUrlController } from '../controllers/edit-original-url-controller'
import { GetLinkByIdController } from '../controllers/get-link-by-id-controller'
import { GetLinkBySlugController } from '../controllers/get-link-by-slug-controller'
import { MakeLinkInactiveController } from '../controllers/make-link-inactive-controller'

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', { onRequest: app.basicAuth }, async (request, reply) => {
    const useCase = app.diContainer.resolve('createShortLinkUseCase')
    const controller = new CreateShortLinkController(useCase)
    return controller.handle(request, reply)
  })

  app.patch(
    '/links/:id',
    { onRequest: app.basicAuth },
    async (request, reply) => {
      const useCase = app.diContainer.resolve('editOriginalUrlUseCase')
      const controller = new EditOriginalUrlController(useCase)
      return controller.handle(request, reply)
    },
  )

  app.delete(
    '/links/:id',
    { onRequest: app.basicAuth },
    async (request, reply) => {
      const useCase = app.diContainer.resolve('makeLinkInactiveUseCase')
      const controller = new MakeLinkInactiveController(useCase)
      return controller.handle(request, reply)
    },
  )

  app.get('/:slug', async (request, reply) => {
    const useCase = app.diContainer.resolve('getLinkBySlugUseCase')
    const controller = new GetLinkBySlugController(useCase)
    return controller.handle(request, reply)
  })

  app.get(
    '/links/:id',
    { onRequest: app.basicAuth },
    async (request, reply) => {
      const useCase = app.diContainer.resolve('getLinkByIdUseCase')
      const controller = new GetLinkByIdController(useCase)
      return controller.handle(request, reply)
    },
  )
}
