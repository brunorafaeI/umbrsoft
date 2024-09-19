import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Profiles } from "./Profiles"

@Index("banking_info_pkey", ["id"], { unique: true })
@Entity("banking_info", { schema: "app_access" })
export class BankingInfo {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "name", nullable: true, length: 50 })
  name: string | null

  @Column("character varying", {
    name: "account_holder",
    nullable: true,
    length: 50,
  })
  accountHolder: string | null

  @Column("integer", { name: "account_number", nullable: true })
  accountNumber: number | null

  @Column("character varying", { name: "iban", nullable: true, length: 100 })
  iban: string | null

  @Column("character varying", { name: "bic", nullable: true, length: 30 })
  bic: string | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Profiles, (profiles) => profiles.bankingInfos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles
}
