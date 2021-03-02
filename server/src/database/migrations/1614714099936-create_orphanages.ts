import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrphanages1614714099936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Método UP => realizar alterações (criar um novo campo, deletar algum campo)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Método DOWN => desfazer o que foi feito (faz tudo o que o up fez ao contrário)
  }
}
