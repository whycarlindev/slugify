export default class SlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Slug "${slug}" already exists`)
    this.name = 'SlugAlreadyExistsError'
  }
}
