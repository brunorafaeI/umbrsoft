import { BaseEntity } from '@/domain/entities/BaseEntity'
import { type PostEntity } from '@/domain/entities/post/PostEntity'
import { type Role } from '@/common/utils/enum'

export abstract class UserEntity extends BaseEntity {
  protected name: string
  protected email: string
  protected token: string
  protected role?: Role
  protected posts?: PostEntity[]
}
