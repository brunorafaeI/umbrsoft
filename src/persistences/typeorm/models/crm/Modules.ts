import { Column, Entity, Index, OneToMany } from 'typeorm'
import { RelationContractModule } from './RelationContractModule'
import { Widgets } from './Widgets'

@Index('modules_pkey', ['id'], { unique: true })
@Entity('modules', { schema: 'app_crm' })
export class Modules {
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

  @Column('uuid', { name: 'id_type' })
    idType: string

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @OneToMany(
    () => RelationContractModule,
    (relationContractModule) => relationContractModule.idModule2
  )
    relationContractModules: RelationContractModule[]

  @OneToMany(() => Widgets, (widgets) => widgets.idModule)
    widgets: Widgets[]
}
