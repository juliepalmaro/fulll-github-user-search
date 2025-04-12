import { User } from '../../types/userType';
import styles from './UserItem.module.css';

export default function UserItem({
	user,
	selectedUsers,
	setSelectedUsers,
}: {
	user: User;
	selectedUsers: Set<number>;
	setSelectedUsers: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
	const handleCheckboxChange = (userId: number) => {
		setSelectedUsers((prevSelected) => {
			const updatedSelected = new Set(prevSelected);
			if (updatedSelected.has(userId)) {
				updatedSelected.delete(userId);
			} else {
				updatedSelected.add(userId);
			}
			return updatedSelected;
		});
	};

	return (
		<div className={styles.userItem}>
			<input
				type="checkbox"
				className={styles.userCheckbox}
				id={`${user.id}`}
				aria-label="Select user"
				checked={selectedUsers.has(user.id)}
				onChange={() => handleCheckboxChange(user.id)}
			/>
			<img src={user.avatar_url} alt="Avatar" className={styles.avatar} />
			<p>{user.id}</p>
			<p>{user.login}</p>
			<button>View profile</button>
		</div>
	);
}
