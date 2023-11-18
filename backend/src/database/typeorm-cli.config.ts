import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Test } from './entities/Test.entity';
// import test from '../'

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
