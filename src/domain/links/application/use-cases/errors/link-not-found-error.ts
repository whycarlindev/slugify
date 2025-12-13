export default class LinkNotFoundError extends Error {
  constructor() {
    super(`Link not found.`)
    this.name = 'LinkNotFoundError'
  }
}
