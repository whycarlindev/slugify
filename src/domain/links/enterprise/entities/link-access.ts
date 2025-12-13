import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from './value-objects/unique-entity-id'

type LinkAccessProps = {
  linkId: string
  accessedAt: Date
  ipAddress: string
}

export class LinkAccess extends Entity<LinkAccessProps> {
  get linkId() {
    return this.props.linkId
  }

  get accessedAt() {
    return this.props.accessedAt
  }

  get ipAddress() {
    return this.props.ipAddress
  }

  static create(props: LinkAccessProps, id?: UniqueEntityId) {
    return new LinkAccess(props, id)
  }
}
