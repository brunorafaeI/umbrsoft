import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1722155439800 implements MigrationInterface {
  name = "UpdateTables1722155439800"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD "is_default" boolean NOT NULL DEFAULT true`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP COLUMN "is_default"`
    )
  }
}
