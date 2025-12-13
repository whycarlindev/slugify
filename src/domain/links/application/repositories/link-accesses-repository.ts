import { LinkAccess } from '../../enterprise/entities/link-access'

export interface LinkAccessesRepository {
  create(linkAccess: LinkAccess): Promise<void>
}
