import { uuidv7 } from 'uuidv7'

export class UniqueEntityId {
  private readonly id: string

  constructor(id?: string) {
    this.id = id || this.generateUniqueId()
  }

  private generateUniqueId(): string {
    return uuidv7()
  }

  get value(): string {
    return this.id
  }
}
