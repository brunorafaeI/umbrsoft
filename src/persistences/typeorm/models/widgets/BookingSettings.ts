import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Profiles } from "../access/Profiles"
import { BookingSpecialDays } from "./BookingSpecialDays"

@Index("booking_settings_pkey", ["id"], { unique: true })
@Entity("booking_settings", { schema: "app_widgets" })
export class BookingSettings {
  @Column("uuid", {
    primary: true,
    name: "id",
    generated: "uuid",
  })
  id: string

  @Column("jsonb", { name: "content", nullable: true })
  content: object | null

  @ManyToOne(() => Profiles, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profiles

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => BookingSpecialDays, (specialDays) => specialDays.bookingSetting)
  specialDays: BookingSpecialDays[]
}
