import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Contracts } from "./Contracts"
import { Coordinates } from "./Coordinates"
import { Clients } from "./Clients"

@Index("etablishments_pkey", ["id"], { unique: true })
@Entity("etablishments", { schema: "app_crm" })
export class Etablishments {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "title", nullable: true, length: 30 })
  title: string | null

  @Column("enum", {
    name: "type",
    nullable: true,
    enum: ["RESTAURANT", "CATERINGT", "BAR", "PUB"],
  })
  type: "RESTAURANT" | "CATERINGT" | "BAR" | "PUB" | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => Contracts, (contracts) => contracts.idEtablishment)
  contracts: Contracts[]

  @ManyToOne(() => Coordinates, (coordinates) => coordinates.etablishments, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "coordinate_id", referencedColumnName: "id" }])
  coordinate: Coordinates

  @ManyToOne(() => Clients, (clients) => clients.etablishments, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_client", referencedColumnName: "id" }])
  idClient: Clients
}
