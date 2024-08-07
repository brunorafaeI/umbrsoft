import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1723062680427 implements MigrationInterface {
    name = 'UpdateTables1723062680427'

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query(`ALTER TYPE "app_access"."profiles_type_enum" RENAME TO "profiles_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "app_access"."profiles_type_enum" AS ENUM('STUDENT', 'EMPLOYEE', 'BUSINESS', 'SELF_EMPLOYED')`);
        await queryRunner.query(`ALTER TABLE "app_access"."profiles" ALTER COLUMN "type" TYPE "app_access"."profiles_type_enum" USING "type"::"text"::"app_access"."profiles_type_enum"`);
        await queryRunner.query(`DROP TYPE "app_access"."profiles_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "app_access"."profiles_type_enum_old" AS ENUM('STANDARD', 'PRO', 'ENTREPRISE')`);
        await queryRunner.query(`ALTER TABLE "app_access"."profiles" ALTER COLUMN "type" TYPE "app_access"."profiles_type_enum_old" USING "type"::"text"::"app_access"."profiles_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "app_access"."profiles_type_enum"`);
        await queryRunner.query(`ALTER TYPE "app_access"."profiles_type_enum_old" RENAME TO "profiles_type_enum"`);
    }

}
