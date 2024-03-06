import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Accounts } from './Accounts'
import { EventParamHistory } from './EventParamHistory'
import { EventTableHistory } from './EventTableHistory'
import { Profiles } from './Profiles'
import { Sessions } from './Sessions'
import { Modules } from '../crm/Modules'

@Index('users_pkey', ['id'], { unique: true })
@Index('users_username_key', ['username'], { unique: true })
@Entity('users', { schema: 'app_access' })
export class Users {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', {
    name: 'username',
    nullable: true,
    unique: true,
    length: 50
  })
    username: string | null

  @Column('character varying', { name: 'password', nullable: true, length: 50 })
    password: string | null

  @Column('jsonb', { name: 'access', nullable: true })
    access: object | null

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => "('now')::date"
  })
    createdAt: Date

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
    updatedAt: Date | null

  @OneToMany(() => Accounts, (accounts) => accounts.user)
    accounts: Accounts[]

  @OneToMany(
    () => EventParamHistory,
    (eventParamHistory) => eventParamHistory.user
  )
    eventParamHistories: EventParamHistory[]

  @OneToMany(
    () => EventTableHistory,
    (eventTableHistory) => eventTableHistory.user
  )
    eventTableHistories: EventTableHistory[]

  @OneToMany(() => Profiles, (profiles) => profiles.user)
    profiles: Profiles[]

  @OneToMany(() => Sessions, (sessions) => sessions.user)
    sessions: Sessions[]

  @OneToMany(
    () => Modules,
    (modules) => modules.user
  )
    modules: Modules[]
}
