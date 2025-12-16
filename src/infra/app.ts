import { fastifyAwilixPlugin } from '@fastify/awilix'
import basicAuth from '@fastify/basic-auth'
import { InjectionMode } from 'awilix'
import fastify from 'fastify'
import { validateBasicAuth } from './auth/validate-basic-auth'
import { registerDependencies } from './container'
import { routes } from './http/routes'

export async function buildApp() {
  const app = fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  })

  await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: false,
    injectionMode: InjectionMode.CLASSIC,
  })

  await app.register(basicAuth, {
    validate: validateBasicAuth,
    authenticate: { realm: 'Admin Area' },
  })

  registerDependencies(app)

  await app.register(routes)

  return app
}
