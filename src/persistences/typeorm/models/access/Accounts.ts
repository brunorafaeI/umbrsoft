import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Users } from "./Users"

@Index("accounts_pkey", ["id"], { unique: true })
@Entity("accounts", { schema: "app_access" })
export class Accounts {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "type", nullable: true, length: 30 })
  type: string | null

  @Column("character varying", { name: "provider", nullable: true, length: 30 })
  provider: string | null

  @Column("character varying", {
    name: "provider_account",
    nullable: true,
    length: 50,
  })
  providerAccount: string | null

  @Column("text", { name: "refresh_token", nullable: true })
  refreshToken: string | null

  @Column("text", { name: "access_token", nullable: true })
  accessToken: string | null

  @Column("text", { name: "id_token", nullable: true })
  idToken: string | null

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date

  @Column("character varying", {
    name: "token_type",
    nullable: true,
    length: 30,
  })
  tokenType: string | null

  @Column("text", { name: "scope", nullable: true })
  scope: string | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Users, (users) => users.accounts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users
}
