import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1614781110759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Segunda tabela: imagens dos orfanatos
    await queryRunner.createTable(new Table({
      // Relação de um para muitos (um orfanato terá várias imagens,
      // mas cada imagem estará relacionada a apenas um orfanato)
      name: 'images',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
