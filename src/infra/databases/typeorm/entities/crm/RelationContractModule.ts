import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Contracts } from './Contracts'
import { Modules } from './Modules'

@Index('relation_contract_module_pkey', ['id'], { unique: true })
@Index('relation_contract_module_id_module_pk', ['idContract', 'idModule'], {
  unique: true
})
@Entity('relation_contract_module', { schema: 'app_crm' })
export class RelationContractModule {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('uuid', { name: 'id_contract', unique: true })
    idContract: string

  @Column('uuid', { name: 'id_module', unique: true })
    idModule: string

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @ManyToOne(
    () => Contracts,
    (contracts) => contracts.relationContractModules,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'id_contract', referencedColumnName: 'id' }])
    idContract2: Contracts

  @ManyToOne(() => Modules, (modules) => modules.relationContractModules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_module', referencedColumnName: 'id' }])
    idModule2: Modules
}
