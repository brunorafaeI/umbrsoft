import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Profiles } from "./Profiles"
import { ParamContactRelationship } from "./ParamContactRelationship"

@Index("contacts_pkey", ["id"], { unique: true })
@Entity("contacts", { schema: "app_access" })
export class Contacts {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("character varying", { name: "name", nullable: true, length: 50 })
  name: string | null

  @Column("uuid", { name: "coordinate_id", nullable: true })
  coordinateId: string | null

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => Profiles, (profiles) => profiles.contacts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles

  @ManyToOne(
    () => ParamContactRelationship,
    (paramContactRelationship) => paramContactRelationship.contacts,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "relationship_id", referencedColumnName: "id" }])
  relationship: ParamContactRelationship
}
