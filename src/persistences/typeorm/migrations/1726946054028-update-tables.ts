import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1726946054028 implements MigrationInterface {
  name = "UpdateTables1726946054028"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "phone"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "phone" jsonb`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "phone"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "phone" character varying(50)`
    )
  }
}
