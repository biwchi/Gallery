import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFileEntity1700305589242 implements MigrationInterface {
    name = 'AddFileEntity1700305589242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "gallery"')

        await queryRunner.query(`CREATE TABLE "gallery"."file" ("id" SERIAL NOT NULL, "fileName" character varying NOT NULL, "path" character varying, "size" integer NOT NULL, "mimeType" character varying(20) NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usr"."user" ADD "refresh_token" character varying(400)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usr"."user" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`DROP TABLE "gallery"."file"`);
    }

}
