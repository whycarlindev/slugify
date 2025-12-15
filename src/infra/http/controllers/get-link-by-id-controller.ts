import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { GetLinkByIdUseCase } from '@/domain/links/application/use-cases/get-link-by-id'
import { getLinkByIdSchema } from '../schemas/link-schemas'

export class GetLinkByIdController {
  constructor(private readonly getLinkByIdUseCase: GetLinkByIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validation = getLinkByIdSchema.safeParse(request.params)

    if (!validation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: z.treeifyError(validation.error),
      })
    }

    const { id } = validation.data

    const result = await this.getLinkByIdUseCase.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      return reply.status(404).send({
        error: error.message,
      })
    }

    const { link } = result.value

    return reply.status(200).send({
      id: link.id,
      slug: link.slug,
      originalUrl: link.originalUrl,
      expirationDate: link.expirationDate,
      clickCount: link.clickCount,
      isActive: link.isActive,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    })
  }
}
