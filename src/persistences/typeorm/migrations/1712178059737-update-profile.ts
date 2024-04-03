import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class UpdateProfile1712178059737 implements MigrationInterface {
  name = 'UpdateProfile1712178059737'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "app_access"."profiles_email_key"')
    await queryRunner.query('ALTER TABLE "app_access"."profiles" ADD "is_active" boolean NOT NULL DEFAULT true')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "app_access"."profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"')
  }
}
