import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Coordinates } from "./Coordinates"
import { ParamCoordinateCountry } from "./ParamCoordinateCountry"

@Index("param_coordinate_city_pkey", ["id"], { unique: true })
@Entity("param_coordinate_city", { schema: "app_crm" })
export class ParamCoordinateCity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number

  @Column("character varying", { name: "title", nullable: true, length: 30 })
  title: string | null

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 50,
  })
  description: string | null

  @Column("character varying", { name: "code", nullable: true, length: 20 })
  code: string | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => Coordinates, (coordinates) => coordinates.city)
  coordinates: Coordinates[]

  @ManyToOne(
    () => ParamCoordinateCountry,
    (paramCoordinateCountry) => paramCoordinateCountry.paramCoordinateCities,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
  country: ParamCoordinateCountry
}
