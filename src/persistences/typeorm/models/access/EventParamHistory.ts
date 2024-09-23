import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Profiles } from "./Profiles"

@Index("event_param_history_pkey", ["id"], { unique: true })
@Entity("event_param_history", { schema: "app_access" })
export class EventParamHistory {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", {
    name: "table_ref",
    nullable: true,
    length: 50,
  })
  tableRef: string | null

  @Column("jsonb", { name: "content", nullable: true })
  content: object | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @ManyToOne(() => Profiles, (profiles) => profiles.eventParamHistories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles
}
