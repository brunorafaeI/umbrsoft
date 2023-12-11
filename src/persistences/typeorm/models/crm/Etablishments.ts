import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Contracts } from './Contracts'
import { Clients } from './Clients'
import { Coordinates } from './Coordinates'
import { ParamTypeEtablishment } from './ParamTypeEtablishment'

@Index('etablishments_pkey', ['id'], { unique: true })
@Entity('etablishments', { schema: 'app_crm' })
export class Etablishments {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'title', nullable: true, length: 30 })
    title: string | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @OneToMany(() => Contracts, (contracts) => contracts.idEtablishment)
    contracts: Contracts[]

  @ManyToOne(() => Clients, (clients) => clients.etablishments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'id' }])
    idClient: Clients

  @ManyToOne(() => Coordinates, (coordinates) => coordinates.etablishments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_coordinate', referencedColumnName: 'id' }])
    idCoordinate: Coordinates

  @ManyToOne(
    () => ParamTypeEtablishment,
    (paramTypeEtablishment) => paramTypeEtablishment.etablishments,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'id' }])
    idType: ParamTypeEtablishment
}
