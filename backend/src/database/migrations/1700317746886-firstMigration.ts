import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FirstMigration1700317746886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE test (
                id INT AUTO_INCREMENT PRIMARY KEY,
                input VARCHAR(255) DEFAULT '',
                user VARCHAR(255) DEFAULT ''
                );`,
    );
    await queryRunner.createTable(
      new Table({
        name: 'test',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'input',
            type: 'varchar',
            default: '',
          },
          {
            name: 'user',
            type: 'varchar',
            default: '',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('test', true);
  }
}
