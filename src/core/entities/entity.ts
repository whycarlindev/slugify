import { UniqueEntityId } from '@/domain/links/enterprise/entities/value-objects/unique-entity-id'

export abstract class Entity<T> {
  private _id: UniqueEntityId
  protected props: T

  get id() {
    return this._id.value
  }

  protected constructor(props: T, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }
}
