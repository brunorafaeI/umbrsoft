import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1727123830878 implements MigrationInterface {
  name = "UpdateTables1727123830878"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP CONSTRAINT "FK_2fc81ebcd960af33a13a7d94d2f"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP CONSTRAINT "FK_2b30041f389eb71b6500ca3787a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP CONSTRAINT "FK_eaeae84e38c0ef27fead84312f9"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP CONSTRAINT "FK_8348ba6c44db5303e52613cf491"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP CONSTRAINT "FK_3a648c989cf5548d2579a81210b"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP CONSTRAINT "FK_e3f58206f5718652722aa87d2a0"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP CONSTRAINT "FK_e5aa709a111808d9a6895835c0a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP CONSTRAINT "FK_5ddc89f803d18f3c151cd1b1801"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" DROP CONSTRAINT "FK_d01057087de4b7b71e62fd657ae"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" DROP CONSTRAINT "FK_de8744b663013b9b192a723cdc7"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" DROP CONSTRAINT "FK_de8744b663013b9b192a723cdc7"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" DROP CONSTRAINT "FK_d01057087de4b7b71e62fd657ae"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP CONSTRAINT "FK_23096dca2f7a9d1505d0267d4c6"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP CONSTRAINT "FK_0d07b8a1a52765ea4c7e0d8178b"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP CONSTRAINT "FK_1453f5886150e2bac62da783f25"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD CONSTRAINT "FK_e5aa709a111808d9a6895835c0a" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
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
      `ALTER TABLE "app_crm"."param_module_group" ADD CONSTRAINT "FK_8348ba6c44db5303e52613cf491" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a" FOREIGN KEY ("coordinate_id") REFERENCES "app_crm"."coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42" FOREIGN KEY ("id_client") REFERENCES "app_crm"."clients"("id") ON DELETE SET NULL ON UPDATE CASCADE`
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
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99" FOREIGN KEY ("contract_id") REFERENCES "app_crm"."contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD CONSTRAINT "FK_3a648c989cf5548d2579a81210b" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD CONSTRAINT "FK_e3f58206f5718652722aa87d2a0" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
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
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ADD CONSTRAINT "FK_d01057087de4b7b71e62fd657ae" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ADD CONSTRAINT "FK_de8744b663013b9b192a723cdc7" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" DROP CONSTRAINT "FK_de8744b663013b9b192a723cdc7"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" DROP CONSTRAINT "FK_d01057087de4b7b71e62fd657ae"`
    )
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
      `ALTER TABLE "app_crm"."modules" DROP CONSTRAINT "FK_e3f58206f5718652722aa87d2a0"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP CONSTRAINT "FK_3a648c989cf5548d2579a81210b"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99"`
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
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP CONSTRAINT "FK_8348ba6c44db5303e52613cf491"`
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
      `ALTER TABLE "app_access"."contacts" DROP CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP CONSTRAINT "FK_e5aa709a111808d9a6895835c0a"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD CONSTRAINT "FK_1453f5886150e2bac62da783f25" FOREIGN KEY ("booking_id") REFERENCES "app_widgets"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD CONSTRAINT "FK_0d07b8a1a52765ea4c7e0d8178b" FOREIGN KEY ("booking_id") REFERENCES "app_widgets"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD CONSTRAINT "FK_23096dca2f7a9d1505d0267d4c6" FOREIGN KEY ("client_id") REFERENCES "app_widgets"."booking_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ADD CONSTRAINT "FK_d01057087de4b7b71e62fd657ae" FOREIGN KEY ("profile_id", "profile_id") REFERENCES "app_access"."profiles"("id","id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ADD CONSTRAINT "FK_de8744b663013b9b192a723cdc7" FOREIGN KEY ("profile_id", "profile_id") REFERENCES "app_access"."profiles"("id","id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ADD CONSTRAINT "FK_de8744b663013b9b192a723cdc7" FOREIGN KEY ("profile_id", "profile_id") REFERENCES "app_access"."profiles"("id","id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ADD CONSTRAINT "FK_d01057087de4b7b71e62fd657ae" FOREIGN KEY ("profile_id", "profile_id") REFERENCES "app_access"."profiles"("id","id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD CONSTRAINT "FK_5ddc89f803d18f3c151cd1b1801" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD CONSTRAINT "FK_f985d4dcb1bdfad106addb8dcd3" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD CONSTRAINT "FK_e5aa709a111808d9a6895835c0a" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD CONSTRAINT "FK_e3f58206f5718652722aa87d2a0" FOREIGN KEY ("profile_id") REFERENCES "app_access"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_50d82dfb3ef4871eca500480eb2" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD CONSTRAINT "FK_3a648c989cf5548d2579a81210b" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD CONSTRAINT "FK_8348ba6c44db5303e52613cf491" FOREIGN KEY ("module_id") REFERENCES "app_crm"."modules"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD CONSTRAINT "FK_65d09b34b3f89e4b3c7012ccc99" FOREIGN KEY ("contract_id") REFERENCES "app_crm"."contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD CONSTRAINT "FK_eaeae84e38c0ef27fead84312f9" FOREIGN KEY ("id_client") REFERENCES "app_crm"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_85dc3cf7eed92200b5c50ecce42" FOREIGN KEY ("id_client") REFERENCES "app_crm"."clients"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD CONSTRAINT "FK_2b30041f389eb71b6500ca3787a" FOREIGN KEY ("coordinate_id") REFERENCES "app_crm"."coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD CONSTRAINT "FK_daa883bf30b6433f7f42c46d54a" FOREIGN KEY ("coordinate_id") REFERENCES "app_crm"."coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD CONSTRAINT "FK_2fc81ebcd960af33a13a7d94d2f" FOREIGN KEY ("id_etablishment") REFERENCES "app_crm"."etablishments"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "app_access"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ALTER COLUMN "id" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
    )
  }
}
