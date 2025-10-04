import { pool } from '@/lib/db';
import { User } from '@/models/user';

export async function getUsers(): Promise<User[]> {
  const res = await pool.query('SELECT id, username, role FROM users');
  return res.rows;
}
