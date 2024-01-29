import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFileTitle1700307872079 implements MigrationInterface {
    name = 'AddFileTitle1700307872079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallery"."app_file" ADD "title" character varying`);
        await queryRunner.query(`UPDATE "gallery"."app_file" SET "title" = 'some_value' WHERE "title" IS NULL;`)
        await queryRunner.query(`ALTER TABLE "gallery"."app_file" ALTER COLUMN "title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallery"."app_file" DROP COLUMN "title"`);
    }

}
