import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateTables1721665699592 implements MigrationInterface {
  name = "UpdateTables1721665699592"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP SCHEMA IF EXISTS "app_access", "app_crm" CASCADE`
    )
    await queryRunner.query(`CREATE SCHEMA "app_crm"`)
    await queryRunner.query(`CREATE SCHEMA "app_access"`)
    await queryRunner.query(
      `CREATE TABLE "app_crm"."param_coordinate_country" ("id" SERIAL NOT NULL, "title" character varying(30), "description" character varying(50), "code" character varying(20), "abbrev" character varying(20), "flag" character varying(120), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "PK_075874ae54ecf6636e64afa320c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "param_coordinate_country_pkey" ON "app_crm"."param_coordinate_country" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."param_coordinate_city" ("id" SERIAL NOT NULL, "title" character varying(30), "description" character varying(50), "code" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "country_id" integer, CONSTRAINT "PK_c9aed17f714afb3eda48e34eb79" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "param_coordinate_city_pkey" ON "app_crm"."param_coordinate_city" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_crm"."etablishments_type_enum" AS ENUM('RESTAURANT', 'CATERINGT', 'BAR', 'PUB')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."etablishments" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(30), "type" "app_crm"."etablishments_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "coordinate_id" uuid, "id_client" uuid, CONSTRAINT "PK_799e51f144f8d49aeaa5b34e814" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "etablishments_pkey" ON "app_crm"."etablishments" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."coordinates" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "address" character varying(120), "address_sup" character varying(120), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "city_id" integer, "country_id" integer, CONSTRAINT "PK_1c59319abc3dbf9c0e3d2ed9250" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "coordinates_pkey" ON "app_crm"."coordinates" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_crm"."clients_type_enum" AS ENUM('STANDARD', 'PRO')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."clients" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(30), "description" character varying(50), "type" "app_crm"."clients_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "coordinate_id" uuid, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "clients_pkey" ON "app_crm"."clients" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_crm"."contracts_type_enum" AS ENUM('MONTHLY', 'TRIMESTRAL', 'SEMIANNUAL', 'YEARLY')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."contracts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type" "app_crm"."contracts_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "id_client" uuid, "id_etablishment" uuid, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "contracts_pkey" ON "app_crm"."contracts" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."param_module_group" ("id" SERIAL NOT NULL, "title" character varying(30), "description" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "module_id" uuid, CONSTRAINT "PK_0f426d415e17297f40a7ba10fb3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "param_module_group_pkey" ON "app_crm"."param_module_group" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_crm"."widgets_type_enum" AS ENUM('STANDARD', 'PRO')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."widgets" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(30), "description" character varying(50), "type" "app_crm"."widgets_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "module_id" uuid, CONSTRAINT "PK_da23136dbcfc91424451e24b725" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "widgets_pkey" ON "app_crm"."widgets" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."banking_info" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(50), "account_holder" character varying(50), "account_number" integer, "iban" character varying(100), "bic" character varying(30), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "profile_id" uuid, CONSTRAINT "PK_79920131d5fa459b32ebcaafd5e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "banking_info_pkey" ON "app_access"."banking_info" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."param_contact_relationship" ("id" SERIAL NOT NULL, "title" character varying(30), "description" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "PK_8640ad0ba949724664c3e2b1e8a" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "param_contact_relationship_pkey" ON "app_access"."param_contact_relationship" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."contacts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(50), "coordinate_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "profile_id" uuid, "relationship_id" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "contacts_pkey" ON "app_access"."contacts" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."personal_info" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "locale" character varying(10), "shirt_size" character varying(10), "coordinate_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "profile_id" uuid, CONSTRAINT "PK_c202a62653f38aa39c4518f02bb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "personal_info_pkey" ON "app_access"."personal_info" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type" character varying(30), "provider" character varying(30), "provider_account" character varying(50), "refresh_token" text, "access_token" text, "id_token" text, "expires_at" TIMESTAMP NOT NULL, "token_type" character varying(30), "scope" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "accounts_pkey" ON "app_access"."accounts" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."sessions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "session_token" character varying(50), "expires" TIMESTAMP, "duration" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "sessions_pkey" ON "app_access"."sessions" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "username" character varying(50) NOT NULL, "password" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_username_key" ON "app_access"."users" ("username") `
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_pkey" ON "app_access"."users" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."event_param_history" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "table_ref" character varying(50), "content" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "profile_id" uuid, CONSTRAINT "PK_3089c8e853875c3e013922f9b6b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "event_param_history_pkey" ON "app_access"."event_param_history" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."event_table_history" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "table_ref" character varying(50), "content" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "profile_id" uuid, CONSTRAINT "PK_ea86bbde072b72d59f294b85cb4" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "event_table_history_pkey" ON "app_access"."event_table_history" ("id") `
    )
    await queryRunner.query(
      `CREATE TYPE "app_access"."profiles_type_enum" AS ENUM('STANDARD', 'PRO', 'ENTREPRISE')`
    )
    await queryRunner.query(
      `CREATE TABLE "app_access"."profiles" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(50) NOT NULL, "phone" character varying(50), "email" character varying(50) NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "image" text, "birthday" date, "access" jsonb, "type" "app_access"."profiles_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "profiles_pkey" ON "app_access"."profiles" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."modules" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(30), "description" character varying(50), "status" integer, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, "profile_id" uuid, CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "modules_pkey" ON "app_crm"."modules" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."relation_contract_module" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "contract_id" uuid NOT NULL, "module_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "UQ_65d09b34b3f89e4b3c7012ccc99" UNIQUE ("contract_id"), CONSTRAINT "UQ_50d82dfb3ef4871eca500480eb2" UNIQUE ("module_id"), CONSTRAINT "PK_9271d74a6856bcf4ddbf4541fdb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "relation_contract_module_pkey" ON "app_crm"."relation_contract_module" ("id") `
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "relation_contract_module_module_id_pk" ON "app_crm"."relation_contract_module" ("contract_id", "module_id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."param_module_status" ("id" SERIAL NOT NULL, "title" character varying(30), "description" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "updated_at" TIMESTAMP, CONSTRAINT "PK_78cc535ba91cd14ea05d9bcacf2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "param_module_status_pkey" ON "app_crm"."param_module_status" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."event_table_history" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "table_ref" character varying(50), "content" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "profile_id" uuid, CONSTRAINT "PK_ea86bbde072b72d59f294b85cb4" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "event_table_history_pkey" ON "app_crm"."event_table_history" ("id") `
    )
    await queryRunner.query(
      `CREATE TABLE "app_crm"."event_param_history" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "table_ref" character varying(50), "content" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT ('now')::date, "profile_id" uuid, CONSTRAINT "PK_3089c8e853875c3e013922f9b6b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "event_param_history_pkey" ON "app_crm"."event_param_history" ("id") `
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" ADD CONSTRAINT "FK_2876f69e199f53d3ce15f57e09c" FOREIGN KEY ("country_id") REFERENCES "app_crm"."param_coordinate_country"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a" FOREIGN KEY ("coordinate_id") REFERENCES "app_crm"."coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42" FOREIGN KEY ("id_client") REFERENCES "app_crm"."clients"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD CONSTRAINT "FK_98edd41dc8293a4f5d14f0f5ea1" FOREIGN KEY ("city_id") REFERENCES "app_crm"."param_coordinate_city"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD CONSTRAINT "FK_6a16776abc6da2b63e381adafbb" FOREIGN KEY ("country_id") REFERENCES "app_crm"."param_coordinate_country"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD CONSTRAINT "FK_2b30041f389eb71b6500ca3787a" FOREIGN KEY ("coordinate_id") REFERENCES "app_crm"."coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD CONSTRAINT "FK_eaeae84e38c0ef27fead84312f9" FOREIGN KEY ("id_client") REFERENCES "app_crm"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD CONSTRAINT "FK_2fc81ebcd960af33a13a7d94d2f" FOREIGN KEY ("id_etablishment") REFERENCES "app_crm"."etablishments"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD CONSTRAINT "FK_8348ba6c44db5303e52613cf491" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD CONSTRAINT "FK_3a648c989cf5548d2579a81210b" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD CONSTRAINT "FK_e5aa709a111808d9a6895835c0a" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD CONSTRAINT "FK_d2c7e81315ba8ddd0ab362c1fb5" FOREIGN KEY ("relationship_id") REFERENCES "app_access"."param_contact_relationship"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD CONSTRAINT "FK_5ddc89f803d18f3c151cd1b1801" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ADD CONSTRAINT "FK_d01057087de4b7b71e62fd657ae" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ADD CONSTRAINT "FK_de8744b663013b9b192a723cdc7" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD CONSTRAINT "FK_e3f58206f5718652722aa87d2a0" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99" FOREIGN KEY ("contract_id") REFERENCES "app_crm"."contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ADD CONSTRAINT "FK_de8744b663013b9b192a723cdc7" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ADD CONSTRAINT "FK_d01057087de4b7b71e62fd657ae" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "app_access", "app_crm" CASCADE`)
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" DROP CONSTRAINT "FK_d01057087de4b7b71e62fd657ae"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" DROP CONSTRAINT "FK_de8744b663013b9b192a723cdc7"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP CONSTRAINT "FK_e3f58206f5718652722aa87d2a0"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" DROP CONSTRAINT "FK_de8744b663013b9b192a723cdc7"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" DROP CONSTRAINT "FK_d01057087de4b7b71e62fd657ae"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP CONSTRAINT "FK_5ddc89f803d18f3c151cd1b1801"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP CONSTRAINT "FK_d2c7e81315ba8ddd0ab362c1fb5"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP CONSTRAINT "FK_e5aa709a111808d9a6895835c0a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP CONSTRAINT "FK_3a648c989cf5548d2579a81210b"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP CONSTRAINT "FK_8348ba6c44db5303e52613cf491"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP CONSTRAINT "FK_2fc81ebcd960af33a13a7d94d2f"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP CONSTRAINT "FK_eaeae84e38c0ef27fead84312f9"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP CONSTRAINT "FK_2b30041f389eb71b6500ca3787a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP CONSTRAINT "FK_6a16776abc6da2b63e381adafbb"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP CONSTRAINT "FK_98edd41dc8293a4f5d14f0f5ea1"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" DROP CONSTRAINT "FK_2876f69e199f53d3ce15f57e09c"`
    )
    await queryRunner.query(`DROP INDEX "app_crm"."event_param_history_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."event_param_history"`)
    await queryRunner.query(`DROP INDEX "app_crm"."event_table_history_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."event_table_history"`)
    await queryRunner.query(`DROP INDEX "app_crm"."param_module_status_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."param_module_status"`)
    await queryRunner.query(
      `DROP INDEX "app_crm"."relation_contract_module_module_id_pk"`
    )
    await queryRunner.query(
      `DROP INDEX "app_crm"."relation_contract_module_pkey"`
    )
    await queryRunner.query(`DROP TABLE "app_crm"."relation_contract_module"`)
    await queryRunner.query(`DROP INDEX "app_crm"."modules_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."modules"`)
    await queryRunner.query(`DROP INDEX "app_access"."profiles_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."profiles"`)
    await queryRunner.query(`DROP TYPE "app_access"."profiles_type_enum"`)
    await queryRunner.query(
      `DROP INDEX "app_access"."event_table_history_pkey"`
    )
    await queryRunner.query(`DROP TABLE "app_access"."event_table_history"`)
    await queryRunner.query(
      `DROP INDEX "app_access"."event_param_history_pkey"`
    )
    await queryRunner.query(`DROP TABLE "app_access"."event_param_history"`)
    await queryRunner.query(`DROP INDEX "app_access"."users_pkey"`)
    await queryRunner.query(`DROP INDEX "app_access"."users_username_key"`)
    await queryRunner.query(`DROP TABLE "app_access"."users"`)
    await queryRunner.query(`DROP INDEX "app_access"."sessions_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."sessions"`)
    await queryRunner.query(`DROP INDEX "app_access"."accounts_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."accounts"`)
    await queryRunner.query(`DROP INDEX "app_access"."personal_info_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."personal_info"`)
    await queryRunner.query(`DROP INDEX "app_access"."contacts_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."contacts"`)
    await queryRunner.query(
      `DROP INDEX "app_access"."param_contact_relationship_pkey"`
    )
    await queryRunner.query(
      `DROP TABLE "app_access"."param_contact_relationship"`
    )
    await queryRunner.query(`DROP INDEX "app_access"."banking_info_pkey"`)
    await queryRunner.query(`DROP TABLE "app_access"."banking_info"`)
    await queryRunner.query(`DROP INDEX "app_crm"."widgets_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."widgets"`)
    await queryRunner.query(`DROP TYPE "app_crm"."widgets_type_enum"`)
    await queryRunner.query(`DROP INDEX "app_crm"."param_module_group_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."param_module_group"`)
    await queryRunner.query(`DROP INDEX "app_crm"."contracts_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."contracts"`)
    await queryRunner.query(`DROP TYPE "app_crm"."contracts_type_enum"`)
    await queryRunner.query(`DROP INDEX "app_crm"."clients_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."clients"`)
    await queryRunner.query(`DROP TYPE "app_crm"."clients_type_enum"`)
    await queryRunner.query(`DROP INDEX "app_crm"."coordinates_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."coordinates"`)
    await queryRunner.query(`DROP INDEX "app_crm"."etablishments_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."etablishments"`)
    await queryRunner.query(`DROP TYPE "app_crm"."etablishments_type_enum"`)
    await queryRunner.query(`DROP INDEX "app_crm"."param_coordinate_city_pkey"`)
    await queryRunner.query(`DROP TABLE "app_crm"."param_coordinate_city"`)
    await queryRunner.query(
      `DROP INDEX "app_crm"."param_coordinate_country_pkey"`
    )
    await queryRunner.query(`DROP TABLE "app_crm"."param_coordinate_country"`)
  }
}
