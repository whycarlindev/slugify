import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CreateShortLinkUseCase } from '@/domain/links/application/use-cases/create-short-link'
import { createShortLinkSchema } from '../schemas/link-schemas'

export class CreateShortLinkController {
  constructor(
    private readonly createShortLinkUseCase: CreateShortLinkUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validation = createShortLinkSchema.safeParse(request.body)

    if (!validation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: z.treeifyError(validation.error),
      })
    }

    const { originalUrl, customSlug, expirationDate } = validation.data

    const result = await this.createShortLinkUseCase.execute({
      originalUrl,
      customSlug,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
    })

    if (result.isLeft()) {
      const error = result.value

      return reply.status(400).send({
        error: error.message,
      })
    }

    const { link } = result.value

    return reply.status(201).send({
      id: link.id,
      slug: link.slug,
      originalUrl: link.originalUrl,
      expirationDate: link.expirationDate,
      clickCount: link.clickCount,
      isActive: link.isActive,
      createdAt: link.createdAt,
    })
  }
}
