import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../env'

export async function validateBasicAuth(
  username: string,
  password: string,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  const basicAuthUser = env.BASIC_AUTH_USER
  const basicAuthPass = env.BASIC_AUTH_PASS

  if (username !== basicAuthUser || password !== basicAuthPass) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }
}
