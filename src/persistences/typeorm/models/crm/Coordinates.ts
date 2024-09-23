import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Clients } from "./Clients"
import { ParamCoordinateCity } from "./ParamCoordinateCity"
import { ParamCoordinateCountry } from "./ParamCoordinateCountry"
import { Etablishments } from "./Etablishments"

@Index("coordinates_pkey", ["id"], { unique: true })
@Entity("coordinates", { schema: "app_crm" })
export class Coordinates {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "address", nullable: true, length: 120 })
  address: string | null

  @Column("character varying", {
    name: "address_sup",
    nullable: true,
    length: 120,
  })
  addressSup: string | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => Clients, (clients) => clients.coordinate)
  clients: Clients[]

  @ManyToOne(
    () => ParamCoordinateCity,
    (paramCoordinateCity) => paramCoordinateCity.coordinates,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: ParamCoordinateCity

  @ManyToOne(
    () => ParamCoordinateCountry,
    (paramCoordinateCountry) => paramCoordinateCountry.coordinates,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
  country: ParamCoordinateCountry

  @OneToMany(() => Etablishments, (etablishments) => etablishments.coordinate)
  etablishments: Etablishments[]
}
