import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Bookings } from "./Bookings"

@Index("booking_settings_pkey", ["id"], { unique: true })
@Entity("booking_settings", { schema: "app_widgets" })
export class BookingSettings {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("jsonb", { name: "content", nullable: true })
  content: object | null

  @ManyToOne(() => Bookings, {
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
