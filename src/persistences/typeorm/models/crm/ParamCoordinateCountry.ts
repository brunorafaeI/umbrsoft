import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Coordinates } from './Coordinates'
import { ParamCoordinateCity } from './ParamCoordinateCity'

@Index('param_coordinate_country_pkey', ['id'], { unique: true })
@Entity('param_coordinate_country', { schema: 'app_crm' })
export class ParamCoordinateCountry {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number

  @Column('character varying', { name: 'title', nullable: true, length: 30 })
    title: string | null

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 50
  })
    description: string | null

  @Column('character varying', { name: 'code', nullable: true, length: 20 })
    code: string | null

  @Column('character varying', { name: 'abbrev', nullable: true, length: 20 })
    abbrev: string | null

  @Column('character varying', { name: 'flag', nullable: true, length: 120 })
    flag: string | null

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => "('now')::date"
  })
    createdAt: Date

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
    updatedAt: Date | null

  @OneToMany(() => Coordinates, (coordinates) => coordinates.country)
    coordinates: Coordinates[]

  @OneToMany(
    () => ParamCoordinateCity,
    (paramCoordinateCity) => paramCoordinateCity.country
  )
    paramCoordinateCities: ParamCoordinateCity[]
}
