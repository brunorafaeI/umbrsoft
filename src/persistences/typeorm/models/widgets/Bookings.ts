import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Profiles } from "../access/Profiles"
import { BookingClients } from "./BookingClients"
import { BookingNotes } from "./BookingNotes"

@Index("bookings_pkey", ["id"], { unique: true })
@Entity("bookings", { schema: "app_widgets" })
export class Bookings {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("timestamp without time zone", { name: "scheduled_at" })
  scheduledAt: Date

  @Column("enum", {
    name: "status",
    enum: ["DONE", "CONFIRMED", "PENDING", "CANCELLED"],
    default: "PENDING",
  })
  status: "DONE" | "CONFIRMED" | "PENDING" | "CANCELLED"

  @Column("jsonb", { name: "slot" })
  slot: object

  @Column("jsonb", { name: "extra_fields", nullable: true })
  extraFields: object | null

  @ManyToOne(() => BookingClients, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: BookingClients

  @ManyToOne(() => Profiles, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => BookingNotes, (notes) => notes.booking)
  notes: BookingNotes[]
}
