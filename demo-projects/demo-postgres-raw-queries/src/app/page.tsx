'use client';

import { useEffect, useState } from 'react';
import { User } from '@/models/user';
import UserList from '@/components/UserList';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserList users={users} />
    </div>
  );
}
