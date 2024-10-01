import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Profiles } from "./Profiles"

@Index("personal_info_pkey", ["id"], { unique: true })
@Entity("personal_info", { schema: "app_access" })
export class PersonalInfo {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("character varying", { name: "locale", nullable: true, length: 10 })
  locale: string | null

  @Column("character varying", {
    name: "shirt_size",
    nullable: true,
    length: 10,
  })
  shirtSize: string | null

  @Column("uuid", { name: "coordinate_id", nullable: true })
  coordinateId: string | null

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Profiles, (profiles) => profiles.personalInfos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles
}
