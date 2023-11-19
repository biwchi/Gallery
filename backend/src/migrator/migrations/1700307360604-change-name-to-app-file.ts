import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameToAppFile1700307360604 implements MigrationInterface {
    name = 'ChangeNameToAppFile1700307360604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gallery"."app_file" ("id" SERIAL NOT NULL, "fileName" character varying NOT NULL, "path" character varying, "size" integer NOT NULL, "mimeType" character varying(20) NOT NULL, CONSTRAINT "PK_e432bb99db5406c0b94289e3809" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gallery"."app_file"`);
    }

}
