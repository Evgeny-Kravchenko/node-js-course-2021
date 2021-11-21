import dotenv from 'dotenv';
import path from 'path';
import User from '../entities/User';
import Board from '../entities/Board';
import Task from '../entities/Task';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  synchronize: false,
  host: process.env.DB_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  autoReconnect: true,
  entities: [User, Board, Task],
  migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  migrationsRun: true,
  migrations: ['./src/migration/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
