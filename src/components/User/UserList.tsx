import { User } from '../../types/userType';
import UserItem from './UserItem';
import styles from './UserList.module.css';

export default function UserList({ users }: { users: User[] }) {
	return (
		<div className={styles.userList}>
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
			{users.length === 0 && <p>No user found</p>}
		</div>
	);
}
