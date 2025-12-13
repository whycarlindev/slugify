export class SlugInactiveError extends Error {
  constructor(slug: string) {
    super(`The slug "${slug}" is inactive.`)
    this.name = 'SlugInactiveError'
  }
}
