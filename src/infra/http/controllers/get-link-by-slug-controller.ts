import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { GetLinkBySlugUseCase } from '@/domain/links/application/use-cases/get-link-by-slug'
import { getLinkBySlugSchema } from '../schemas/link-schemas'

export class GetLinkBySlugController {
  constructor(private readonly getLinkBySlugUseCase: GetLinkBySlugUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validation = getLinkBySlugSchema.safeParse(request.params)

    if (!validation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: z.treeifyError(validation.error),
      })
    }

    const { slug } = validation.data
    const accessIp = request.ip

    const result = await this.getLinkBySlugUseCase.execute({
      slug,
      accessIp,
    })

    if (result.isLeft()) {
      const error = result.value

      return reply.status(404).send({
        error: error.message,
      })
    }

    const { link } = result.value

    return reply.redirect(link.originalUrl)
  }
}
