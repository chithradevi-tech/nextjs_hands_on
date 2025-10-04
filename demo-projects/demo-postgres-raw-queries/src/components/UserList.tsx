import { User } from '@/models/user';

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.username} - {u.role}
        </li>
      ))}
    </ul>
  );
}
