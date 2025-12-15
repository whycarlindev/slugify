import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { EditOriginalUrlUseCase } from '@/domain/links/application/use-cases/edit-original-url'
import { editOriginalUrlSchema } from '../schemas/link-schemas'

export class EditOriginalUrlController {
  constructor(
    private readonly editOriginalUrlUseCase: EditOriginalUrlUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const paramsValidation = editOriginalUrlSchema.params.safeParse(
      request.params,
    )

    if (!paramsValidation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: z.treeifyError(paramsValidation.error),
      })
    }

    const bodyValidation = editOriginalUrlSchema.body.safeParse(request.body)

    if (!bodyValidation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: bodyValidation.error.format(),
      })
    }

    const { id } = paramsValidation.data
    const { originalUrl } = bodyValidation.data

    const result = await this.editOriginalUrlUseCase.execute({
      id,
      newOriginalUrl: originalUrl,
    })

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
