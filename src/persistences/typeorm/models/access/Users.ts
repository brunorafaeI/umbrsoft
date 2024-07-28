import { Column, Entity, Index, OneToMany } from "typeorm"
import { Accounts } from "./Accounts"
import { Profiles } from "./Profiles"
import { Sessions } from "./Sessions"

@Index("users_pkey", ["id"], { unique: true })
@Index("users_username_key", ["username"], { unique: true })
@Entity("users", { schema: "app_access" })
export class Users {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", {
    name: "username",
    unique: true,
    length: 50,
  })
  username: string

  @Column("text", { name: "password", nullable: true, select: false })
  password: string | null

  @Column("text", { name: "access_token" })
  accessToken: string

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => Accounts, (accounts) => accounts.user)
  accounts: Accounts[]

  @OneToMany(() => Profiles, (profiles) => profiles.user, {
    eager: true,
    persistence: true,
  })
  profiles: Profiles[]

  @OneToMany(() => Sessions, (sessions) => sessions.user)
  sessions: Sessions[]
}
