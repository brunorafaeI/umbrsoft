import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Contracts } from './Contracts'

@Index('param_type_contract_pkey', ['id'], { unique: true })
@Entity('param_type_contract', { schema: 'app_crm' })
export class ParamTypeContract {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'title', nullable: true, length: 30 })
    title: string | null

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 50
  })
    description: string | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @OneToMany(() => Contracts, (contracts) => contracts.idType)
    contracts: Contracts[]
}
