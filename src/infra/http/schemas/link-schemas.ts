import { z } from 'zod'

export const createShortLinkSchema = z.object({
  originalUrl: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'originalUrl is required'
          : 'originalUrl must be a string',
    })
    .url({
      error: 'originalUrl must be a valid URL',
    }),
  customSlug: z
    .string()
    .min(3, { error: 'customSlug must have at least 3 characters' })
    .max(255, { error: 'customSlug must have at most 255 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      error:
        'customSlug can only contain letters, numbers, hyphens and underscores',
    })
    .optional(),
  expirationDate: z
    .string()
    .datetime({
      error: 'expirationDate must be a valid ISO 8601 datetime',
    })
    .optional(),
})

export const getLinkBySlugSchema = z.object({
  slug: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'slug is required'
          : 'slug must be a string',
    })
    .min(1, { error: 'slug cannot be empty' }),
})

export const getLinkByIdSchema = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'id is required' : 'id must be a string',
    })
    .uuid({
      error: 'id must be a valid UUID',
    }),
})

export const editOriginalUrlSchema = {
  params: z.object({
    id: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'id is required' : 'id must be a string',
      })
      .uuid({
        error: 'id must be a valid UUID',
      }),
  }),
  body: z.object({
    originalUrl: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'originalUrl is required'
            : 'originalUrl must be a string',
      })
      .url({
        error: 'originalUrl must be a valid URL',
      }),
  }),
}

export const makeLinkInactiveSchema = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'id is required' : 'id must be a string',
    })
    .uuid({
      error: 'id must be a valid UUID',
    }),
})

export type CreateShortLinkInput = z.infer<typeof createShortLinkSchema>
export type GetLinkBySlugInput = z.infer<typeof getLinkBySlugSchema>
export type GetLinkByIdInput = z.infer<typeof getLinkByIdSchema>
export type EditOriginalUrlParamsInput = z.infer<
  typeof editOriginalUrlSchema.params
>
export type EditOriginalUrlBodyInput = z.infer<
  typeof editOriginalUrlSchema.body
>
export type MakeLinkInactiveInput = z.infer<typeof makeLinkInactiveSchema>
