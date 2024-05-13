import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { BankingInfo } from './BankingInfo'
import { Contacts } from './Contacts'
import { PersonalInfo } from './PersonalInfo'
import { Users } from './Users'
import { Modules } from '../crm/Modules'
import { EventParamHistory } from './EventParamHistory'
import { EventTableHistory } from './EventTableHistory'

@Index('profiles_pkey', ['id'], { unique: true })
@Entity('profiles', { schema: 'app_access' })
export class Profiles {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'name', length: 50 })
    name: string

  @Column('character varying', { name: 'phone', nullable: true, length: 50 })
    phone: string | null

  @Column('character varying', {
    name: 'email',
    length: 50
  })
    email: string

  @Column('boolean', {
    name: 'email_verified',
    default: () => 'false'
  })
    emailVerified: boolean

  @Column('boolean', {
    name: 'is_active',
    default: () => 'true'
  })
    isActive: boolean

  @Column('text', { name: 'image', nullable: true })
    image: string | null

  @Column('date', { name: 'birthday', nullable: true })
    birthday: Date | null

  @Column('enum', {
    name: 'type',
    nullable: true,
    enum: ['STANDARD', 'PRO', 'ENTREPRISE']
  })
    type: 'STANDARD' | 'PRO' | 'ENTREPRISE' | null

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => "('now')::date"
  })
    createdAt: Date

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
    updatedAt: Date | null

  @OneToMany(() => BankingInfo, (bankingInfo) => bankingInfo.profile)
    bankingInfos: BankingInfo[]

  @OneToMany(() => Contacts, (contacts) => contacts.profile)
    contacts: Contacts[]

  @OneToMany(() => PersonalInfo, (personalInfo) => personalInfo.profile)
    personalInfos: PersonalInfo[]

  @ManyToOne(() => Users, (users) => users.profiles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: Users

  @OneToMany(
    () => Modules,
    (modules) => modules.profile
  )
    modules: Modules[]

  @OneToMany(
    () => EventParamHistory,
    (eventParamHistory) => eventParamHistory.profile
  )
    eventParamHistories: EventParamHistory[]

  @OneToMany(
    () => EventTableHistory,
    (eventTableHistory) => eventTableHistory.profile
  )
    eventTableHistories: EventTableHistory[]
}
