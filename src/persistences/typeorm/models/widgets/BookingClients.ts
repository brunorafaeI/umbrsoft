import { Column, Entity, Index, OneToMany } from "typeorm"
import { Bookings } from "./Bookings"

@Index("booking_clients_pkey", ["id"], { unique: true })
@Entity("booking_clients", { schema: "app_widgets" })
export class BookingClients {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", {
    name: "name",
    length: 30,
  })
  name: string

  @Column("character varying", {
    name: "email",
    unique: true,
    length: 50,
  })
  email: string

  @Column("jsonb", { name: "phone", nullable: true })
  phone: string | null

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "('now')::date",
  })
  createdAt: Date

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null

  @OneToMany(() => Bookings, (bookings) => bookings.client)
  bookings: Bookings[]
}
