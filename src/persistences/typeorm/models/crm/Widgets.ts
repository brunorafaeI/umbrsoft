import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Modules } from "./Modules"

@Index("widgets_pkey", ["id"], { unique: true })
@Entity("widgets", { schema: "app_crm" })
export class Widgets {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
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

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Modules, (modules) => modules.widgets, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "module_id", referencedColumnName: "id" }])
  module: Modules
}
