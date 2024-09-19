import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Coordinates } from "./Coordinates"
import { Contracts } from "./Contracts"
import { Etablishments } from "./Etablishments"

@Index("clients_pkey", ["id"], { unique: true })
@Entity("clients", { schema: "app_crm" })
export class Clients {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "title", nullable: true, length: 30 })
  title: string | null

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 50,
  })
  description: string | null

  @Column("enum", { name: "type", nullable: true, enum: ["STANDARD", "PRO"] })
  type: "STANDARD" | "PRO" | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Coordinates, (coordinates) => coordinates.clients, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "coordinate_id", referencedColumnName: "id" }])
  coordinate: Coordinates

  @OneToMany(() => Contracts, (contracts) => contracts.idClient)
  contracts: Contracts[]

  @OneToMany(() => Etablishments, (etablishments) => etablishments.idClient)
  etablishments: Etablishments[]
}
