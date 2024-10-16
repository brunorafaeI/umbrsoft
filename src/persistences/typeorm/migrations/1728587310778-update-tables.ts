import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1728587310778 implements MigrationInterface {
  name = "UpdateTables1728587310778"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_widgets"."booking_special_days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scheduled_at" TIMESTAMP WITH TIME ZONE NOT NULL, "slot" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "booking_setting_id" uuid, CONSTRAINT "UQ_83acf4d98cdaee8af10aabc8a67" UNIQUE ("scheduled_at"), CONSTRAINT "PK_89fc0a2e3be7c0e2ebf4956930c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "booking_special_days_pkey" ON "app_widgets"."booking_special_days" ("id") `
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_special_days" ADD CONSTRAINT "FK_c7bd8e42e04361c26f05683656c" FOREIGN KEY ("booking_setting_id") REFERENCES "app_widgets"."booking_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_special_days" DROP CONSTRAINT "FK_c7bd8e42e04361c26f05683656c"`
    )
    await queryRunner.query(
      `DROP INDEX "app_widgets"."booking_special_days_pkey"`
    )
    await queryRunner.query(`DROP TABLE "app_widgets"."booking_special_days"`)
  }
}
