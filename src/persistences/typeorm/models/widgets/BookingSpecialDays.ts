import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { BookingSettings } from "./BookingSettings"

@Index("booking_special_days_pkey", ["id"], { unique: true })
@Entity("booking_special_days", { schema: "app_widgets" })
export class BookingSpecialDays {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("timestamp with time zone", { name: "scheduled_at", unique: true })
  scheduledAt: Date

  @Column("jsonb", { name: "slot", nullable: true })
  slot: object | null

  @ManyToOne(() => BookingSettings, (bookings) => bookings.specialDays, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "booking_setting_id", referencedColumnName: "id" }])
  bookingSetting: BookingSettings

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null
}
