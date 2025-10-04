import { NextResponse } from 'next/server';
import { getUsers } from '@/actions/userActions';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
