import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Contracts } from "./Contracts"
import { Modules } from "./Modules"

@Index("relation_contract_module_module_id_pk", ["contractId", "moduleId"], {
  unique: true,
})
@Index("relation_contract_module_pkey", ["id"], { unique: true })
@Entity("relation_contract_module", { schema: "app_crm" })
export class RelationContractModule {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("uuid", { name: "contract_id", unique: true })
  contractId: string

  @Column("uuid", { name: "module_id", unique: true })
  moduleId: string

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(
    () => Contracts,
    (contracts) => contracts.relationContractModules,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "contract_id", referencedColumnName: "id" }])
  contract: Contracts

  @ManyToOne(() => Modules, (modules) => modules.relationContractModules, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "module_id", referencedColumnName: "id" }])
  module: Modules
}
