export default class ExpirationDateMustBeFutureError extends Error {
  constructor(date: Date) {
    super(`Expiration date "${date.toISOString()}" must be a future date`)
    this.name = 'ExpirationDateMustBeFutureError'
  }
}
