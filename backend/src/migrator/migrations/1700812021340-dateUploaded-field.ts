import { MigrationInterface, QueryRunner } from 'typeorm';

export class DateUploadedField1700812021340 implements MigrationInterface {
  name = 'DateUploadedField1700812021340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gallery"."app_file" ADD "dateUploaded" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `UPDATE "gallery"."app_file" SET "dateUploaded" = now() WHERE "dateUploaded" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery"."app_file" ALTER COLUMN "dateUploaded" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gallery"."app_file" DROP COLUMN "dateUploaded"`,
    );
  }
}
