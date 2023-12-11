import { Column, Entity, Index } from 'typeorm'

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'app_access' })
export class Users {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'email', nullable: true, length: 50 })
    email: string | null

  @Column('character varying', { name: 'password', nullable: true, length: 50 })
    password: string | null

  @Column('jsonb', { name: 'roles', nullable: true })
    roles: object | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null
}
