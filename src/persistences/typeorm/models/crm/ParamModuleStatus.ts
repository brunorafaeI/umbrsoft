import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("param_module_status_pkey", ["id"], { unique: true })
@Entity("param_module_status", { schema: "app_crm" })
export class ParamModuleStatus {
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

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null
}
