import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Clients } from './Clients'
import { ParamCountry } from './ParamCountry'
import { Etablishments } from './Etablishments'

@Index('coordinates_pkey', ['id'], { unique: true })
@Entity('coordinates', { schema: 'app_crm' })
export class Coordinates {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('json', { name: 'phone', nullable: true })
    phone: object | null

  @Column('character varying', { name: 'email', nullable: true, length: 50 })
    email: string | null

  @Column('character varying', { name: 'city', nullable: true, length: 50 })
    city: string | null

  @Column('json', { name: 'address', nullable: true })
    address: object | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @OneToMany(() => Clients, (clients) => clients.idCoordinate)
    clients: Clients[]

  @ManyToOne(() => ParamCountry, (paramCountry) => paramCountry.coordinates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'id' }])
    idCountry: ParamCountry

  @OneToMany(() => Etablishments, (etablishments) => etablishments.idCoordinate)
    etablishments: Etablishments[]
}
