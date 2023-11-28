import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Clients } from './Clients'
import { Etablishments } from './Etablishments'
import { ParamTypeContract } from './ParamTypeContract'
import { RelationContractModule } from './RelationContractModule'

@Index('contracts_pkey', ['id'], { unique: true })
@Entity('contracts', { schema: 'app_crm' })
export class Contracts {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @ManyToOne(() => Clients, (clients) => clients.contracts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'id' }])
    idClient: Clients

  @ManyToOne(() => Etablishments, (etablishments) => etablishments.contracts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_etablishment', referencedColumnName: 'id' }])
    idEtablishment: Etablishments

  @ManyToOne(
    () => ParamTypeContract,
    (paramTypeContract) => paramTypeContract.contracts,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'id' }])
    idType: ParamTypeContract

  @OneToMany(
    () => RelationContractModule,
    (relationContractModule) => relationContractModule.idContract2
  )
    relationContractModules: RelationContractModule[]
}
