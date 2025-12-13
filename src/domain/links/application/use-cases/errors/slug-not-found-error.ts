export default class SlugNotFoundError extends Error {
  constructor() {
    super(`Slug not found.`)
    this.name = 'SlugNotFoundError'
  }
}
