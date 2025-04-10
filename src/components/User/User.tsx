import styles from './User.module.css';

export default function User() {
	return (
		<div className={styles.item}>
			<input type="checkbox" className={styles.checkbox} />
			<img
				src="https://avatars.githubusercontent.com/u/748?v=4"
				alt="Avatar"
				className={styles.avatar}
			/>
			<p>id</p>
			<p>login</p>
			<button>View profile</button>
		</div>
	);
}
