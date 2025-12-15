import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from './value-objects/unique-entity-id'

type LinkProps = {
  slug: string
  originalUrl: string
  expirationDate: Date
  clickCount: number
  isActive: boolean

  createdAt: Date
  updatedAt: Date | null
}

export class Link extends Entity<LinkProps> {
  get slug() {
    return this.props.slug
  }

  get originalUrl() {
    return this.props.originalUrl
  }

  get expirationDate() {
    return this.props.expirationDate
  }

  get isActive() {
    return this.props.isActive
  }

  get clickCount() {
    return this.props.clickCount
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set clickCount(count: number) {
    this.props.clickCount = count
    this.touch()
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
    this.touch()
  }

  set originalUrl(url: string) {
    this.props.originalUrl = url
    this.touch()
  }

  public addOneClick() {
    this.props.clickCount += 1
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<LinkProps, 'createdAt' | 'updatedAt' | 'expirationDate'>,
    id?: UniqueEntityId,
  ) {
    const date30DaysFromNow = new Date()
    date30DaysFromNow.setDate(date30DaysFromNow.getDate() + 30)

    const link = new Link(
      {
        ...props,
        expirationDate: props.expirationDate ?? date30DaysFromNow,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return link
  }
}
