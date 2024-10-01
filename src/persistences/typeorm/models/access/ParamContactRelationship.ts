import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Contacts } from "./Contacts"

@Index("param_contact_relationship_pkey", ["id"], { unique: true })
@Entity("param_contact_relationship", { schema: "app_access" })
export class ParamContactRelationship {
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

  @OneToMany(() => Contacts, (contacts) => contacts.relationship)
  contacts: Contacts[]
}
