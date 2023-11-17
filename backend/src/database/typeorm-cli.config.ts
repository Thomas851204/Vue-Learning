import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Test } from './entities/Test.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [Test],
  synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
