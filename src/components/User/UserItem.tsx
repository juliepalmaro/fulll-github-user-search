import { User } from '../../types/userType';
import styles from './UserItem.module.css';

export default function UserItem({ user }: { user: User }) {
	return (
		<div className={styles.userItem}>
			<input
				type="checkbox"
				className={styles.userCheckbox}
				id="userCheckbox"
				aria-label="Select user"
			/>
			<img src={user.avatar} alt="Avatar" className={styles.avatar} />
			<p>{user.id}</p>
			<p>{user.login}</p>
			<button>View profile</button>
		</div>
	);
}
