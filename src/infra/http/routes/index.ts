import { FastifyInstance } from 'fastify'
import { linksRoutes } from './links'

export async function routes(app: FastifyInstance) {
  await app.register(linksRoutes)
}
