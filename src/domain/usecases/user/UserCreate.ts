import { type Role } from '@/common/utils/enum'
import { type PostEntity, UserEntity } from '@/domain/entities'

export class UserCreate extends UserEntity {
  readonly id?: string
  readonly name: string
  readonly email: string
  readonly role?: Role
  readonly posts?: PostEntity[]
  readonly createdAt?: Date
  readonly updatedAt?: Date
}
