import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1721980537015 implements MigrationInterface {
  name = "UpdateTables1721980537015"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ADD "access_token" text NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" DROP COLUMN "access_token"`
    )
  }
}
