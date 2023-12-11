import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Coordinates } from './Coordinates'

@Index('param_country_pkey', ['id'], { unique: true })
@Entity('param_country', { schema: 'app_crm' })
export class ParamCountry {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'code', nullable: true, length: 30 })
    code: string | null

  @Column('character varying', { name: 'abrege', nullable: true, length: 5 })
    abrege: string | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @OneToMany(() => Coordinates, (coordinates) => coordinates.idCountry)
    coordinates: Coordinates[]
}
