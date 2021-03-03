import {MigrationInterface, QueryRunner, Table} from "typeorm";

// Método UP => realizar alterações (criar um novo campo, deletar algum campo)
// Método DOWN => desfazer o que foi feito (faz tudo o que o up fez ao contrário)

export class createOrphanages1614714099936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Primeira tabela: listagens dos orfanatos
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
