import { User } from '../../types/userType';
import UserItem from './UserItem';
import styles from './UserList.module.css';

export default function UserList({
	users,
	selectedUsers,
	setSelectedUsers,
}: {
	users: User[];
	selectedUsers: Set<number>;
	setSelectedUsers: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
	return (
		<div className={styles.userList}>
			{users.map((user) => (
				<UserItem
					key={user.id}
					user={user}
					selectedUsers={selectedUsers}
					setSelectedUsers={setSelectedUsers}
				/>
			))}
			{users.length === 0 && <p>No user found</p>}
		</div>
	);
}
