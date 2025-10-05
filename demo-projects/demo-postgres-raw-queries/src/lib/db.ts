import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo_postgres_raw',
  password: 'root', 
  port: 5432,
});
