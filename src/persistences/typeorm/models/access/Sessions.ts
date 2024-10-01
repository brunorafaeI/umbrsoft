import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Users } from "./Users"

@Index("sessions_pkey", ["id"], { unique: true })
@Entity("sessions", { schema: "app_access" })
export class Sessions {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("character varying", {
    name: "session_token",
    nullable: true,
    length: 50,
  })
  sessionToken: string | null

  @Column("timestamp with time zone", { name: "expires", nullable: true })
  expires: Date | null

  @Column("timestamp with time zone", { name: "duration", nullable: true })
  duration: Date | null

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Users, (users) => users.sessions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users
}
