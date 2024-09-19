import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Bookings } from "./Bookings"

@Index("booking_notes_pkey", ["id"], { unique: true })
@Entity("booking_notes", { schema: "app_widgets" })
export class BookingNotes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("enum", {
    name: "status",
    enum: ["OPEN", "CLOSED"],
    default: "'OPEN'",
  })
  status: "OPEN" | "CLOSED"

  @Column("timestamp without time zone", { name: "scheduled_at" })
  scheduledAt: Date

  @Column("jsonb", { name: "attachments", nullable: true })
  attachments: object | null

  @ManyToOne(() => Bookings, (bookings) => bookings.notes, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "booking_id", referencedColumnName: "id" }])
  booking: Bookings

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null
}
