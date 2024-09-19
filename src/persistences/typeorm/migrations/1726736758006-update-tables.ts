import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateTables1726736758006 implements MigrationInterface {
  name = "UpdateTables1726736758006"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "app_widgets"`)
    await queryRunner.query(
      `CREATE TYPE "app_widgets"."booking_notes_status_enum" AS ENUM('OPEN', 'CLOSED')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_widgets"."booking_notes" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "status" "app_widgets"."booking_notes_status_enum" NOT NULL DEFAULT 'OPEN', "scheduled_at" TIMESTAMP NOT NULL, "attachments" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "booking_id" uuid, CONSTRAINT "PK_aafd0bc2d88945d5785bf237115" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "booking_notes_pkey" ON "app_widgets"."booking_notes" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_widgets"."bookings_status_enum" AS ENUM('DONE', 'CONFIRMED', 'PENDING', 'CANCELLED')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_widgets"."bookings" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "scheduled_at" TIMESTAMP NOT NULL, "status" "app_widgets"."bookings_status_enum" NOT NULL DEFAULT 'PENDING', "slot" jsonb NOT NULL, "extra_fields" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "client_id" uuid, "profile_id" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "bookings_pkey" ON "app_widgets"."bookings" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_widgets"."booking_clients" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(30) NOT NULL, "email" character varying(50) NOT NULL, "phone" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "UQ_7d03e9234d493ad385867023c37" UNIQUE ("email"), CONSTRAINT "PK_2315be22342c191f2b7d7ad4a04" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "booking_clients_pkey" ON "app_widgets"."booking_clients" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_widgets"."booking_settings" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "content" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "booking_id" uuid, CONSTRAINT "PK_1bb13e911613647af2a151ab0a0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "booking_settings_pkey" ON "app_widgets"."booking_settings" ("id") `
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD CONSTRAINT "FK_0d07b8a1a52765ea4c7e0d8178b" FOREIGN KEY ("booking_id") REFERENCES "app_widgets"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD CONSTRAINT "FK_23096dca2f7a9d1505d0267d4c6" FOREIGN KEY ("client_id") REFERENCES "app_widgets"."booking_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD CONSTRAINT "FK_1453f5886150e2bac62da783f25" FOREIGN KEY ("booking_id") REFERENCES "app_widgets"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "app_widgets" CASCADE`)
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP CONSTRAINT "FK_1453f5886150e2bac62da783f25"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP CONSTRAINT "FK_23096dca2f7a9d1505d0267d4c6"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP CONSTRAINT "FK_0d07b8a1a52765ea4c7e0d8178b"`
    )
    await queryRunner.query(`DROP INDEX "app_widgets"."booking_settings_pkey"`)
    await queryRunner.query(`DROP TABLE "app_widgets"."booking_settings"`)
    await queryRunner.query(`DROP INDEX "app_widgets"."booking_clients_pkey"`)
    await queryRunner.query(`DROP TABLE "app_widgets"."booking_clients"`)
    await queryRunner.query(`DROP INDEX "app_widgets"."bookings_pkey"`)
    await queryRunner.query(`DROP TABLE "app_widgets"."bookings"`)
    await queryRunner.query(`DROP TYPE "app_widgets"."bookings_status_enum"`)
    await queryRunner.query(`DROP INDEX "app_widgets"."booking_notes_pkey"`)
    await queryRunner.query(`DROP TABLE "app_widgets"."booking_notes"`)
    await queryRunner.query(
      `DROP TYPE "app_widgets"."booking_notes_status_enum"`
    )
  }
}
