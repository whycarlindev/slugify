import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { MakeLinkInactiveUseCase } from '@/domain/links/application/use-cases/make-link-inactive'
import { makeLinkInactiveSchema } from '../schemas/link-schemas'

export class MakeLinkInactiveController {
  constructor(
    private readonly makeLinkInactiveUseCase: MakeLinkInactiveUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validation = makeLinkInactiveSchema.safeParse(request.params)

    if (!validation.success) {
      return reply.status(400).send({
        error: 'Validation error',
        details: z.treeifyError(validation.error),
      })
    }

    const { id } = validation.data

    const result = await this.makeLinkInactiveUseCase.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      return reply.status(404).send({
        error: error.message,
      })
    }

    return reply.status(204).send()
  }
}
