import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Clients } from "./Clients"
import { Etablishments } from "./Etablishments"
import { RelationContractModule } from "./RelationContractModule"

@Index("contracts_pkey", ["id"], { unique: true })
@Entity("contracts", { schema: "app_crm" })
export class Contracts {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("enum", {
    name: "type",
    nullable: true,
    enum: ["MONTHLY", "TRIMESTRAL", "SEMIANNUAL", "YEARLY"],
  })
  type: "MONTHLY" | "TRIMESTRAL" | "SEMIANNUAL" | "YEARLY" | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Clients, (clients) => clients.contracts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_client", referencedColumnName: "id" }])
  idClient: Clients

  @ManyToOne(() => Etablishments, (etablishments) => etablishments.contracts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_etablishment", referencedColumnName: "id" }])
  idEtablishment: Etablishments

  @OneToMany(
    () => RelationContractModule,
    (relationContractModule) => relationContractModule.contract
  )
  relationContractModules: RelationContractModule[]
}
