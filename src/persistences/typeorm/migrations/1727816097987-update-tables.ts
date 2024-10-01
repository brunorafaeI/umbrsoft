import { type MigrationInterface, type QueryRunner } from "typeorm"

export class UpdateTables1727816097987 implements MigrationInterface {
  name = "UpdateTables1727816097987"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "expires_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "expires"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "expires" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "duration"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "duration" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "scheduled_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "scheduled_at" TIMESTAMP WITH TIME ZONE NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" ADD "updated_at" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_param_history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."event_table_history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_status" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."bookings" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" DROP COLUMN "scheduled_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_notes" ADD "scheduled_at" TIMESTAMP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."profiles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_widgets"."booking_settings" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_table_history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."event_param_history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."modules" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."widgets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."relation_contract_module" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."contracts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."coordinates" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."etablishments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_city" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_coordinate_country" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_crm"."param_module_group" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "duration"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "duration" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" DROP COLUMN "expires"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."sessions" ADD "expires" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" DROP COLUMN "expires_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."accounts" ADD "expires_at" TIMESTAMP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."personal_info" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."contacts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."param_contact_relationship" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP COLUMN "updated_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD "updated_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" DROP COLUMN "created_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "app_access"."banking_info" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
  }
}
