import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Coordinates } from './Coordinates'
import { ParamTypeClient } from './ParamTypeClient'
import { Contracts } from './Contracts'
import { Etablishments } from './Etablishments'

@Index('clients_pkey', ['id'], { unique: true })
@Entity('clients', { schema: 'app_crm' })
export class Clients {
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

  @ManyToOne(() => Coordinates, (coordinates) => coordinates.clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_coordinate', referencedColumnName: 'id' }])
    idCoordinate: Coordinates

  @ManyToOne(
    () => ParamTypeClient,
    (paramTypeClient) => paramTypeClient.clients,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'id' }])
    idType: ParamTypeClient

  @OneToMany(() => Contracts, (contracts) => contracts.idClient)
    contracts: Contracts[]

  @OneToMany(() => Etablishments, (etablishments) => etablishments.idClient)
    etablishments: Etablishments[]
}
