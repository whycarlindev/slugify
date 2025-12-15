import type { Knex } from 'knex'

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'slugify',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/infra/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/infra/database/seeds',
    extension: 'ts',
  },
}

export default config
