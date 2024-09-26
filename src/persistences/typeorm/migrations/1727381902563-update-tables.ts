import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1727381902563 implements MigrationInterface {
  name = "UpdateTables1727381902563"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP CONSTRAINT "FK_1453f5886150e2bac62da783f25"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" RENAME COLUMN "booking_id" TO "profile_id"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD CONSTRAINT "FK_714b6767a3553af17b9f1deb703" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP CONSTRAINT "FK_714b6767a3553af17b9f1deb703"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" RENAME COLUMN "profile_id" TO "booking_id"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD CONSTRAINT "FK_1453f5886150e2bac62da783f25" FOREIGN KEY ("booking_id") REFERENCES "app_widgets"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }
}
