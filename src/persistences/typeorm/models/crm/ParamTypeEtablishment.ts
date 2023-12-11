import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Etablishments } from './Etablishments'

@Index('param_type_etablishment_pkey', ['id'], { unique: true })
@Entity('param_type_etablishment', { schema: 'app_crm' })
export class ParamTypeEtablishment {
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

  @OneToMany(() => Etablishments, (etablishments) => etablishments.idType)
    etablishments: Etablishments[]
}
