import User from './User';
import styles from './UserList.module.css';

export default function UserList() {
	return (
		<div className={styles.list}>
			<User />
			<User />
			<User />
			<User />
			<User />
			<User />
			<User />
			<User />
		</div>
	);
}
