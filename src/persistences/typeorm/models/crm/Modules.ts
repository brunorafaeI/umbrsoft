import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { ParamModuleGroup } from "./ParamModuleGroup"
import { RelationContractModule } from "./RelationContractModule"
import { Widgets } from "./Widgets"
import { Profiles } from "../access/Profiles"

@Index("modules_pkey", ["id"], { unique: true })
@Entity("modules", { schema: "app_crm" })
export class Modules {
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

  @ManyToOne(() => Profiles, (profiles) => profiles.modules, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles

  @Column("integer", { name: "status", nullable: true })
  status: number | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(
    () => ParamModuleGroup,
    (paramModuleGroup) => paramModuleGroup.module
  )
  paramModuleGroups: ParamModuleGroup[]

  @OneToMany(
    () => RelationContractModule,
    (relationContractModule) => relationContractModule.module
  )
  relationContractModules: RelationContractModule[]

  @OneToMany(() => Widgets, (widgets) => widgets.module)
  widgets: Widgets[]
}
