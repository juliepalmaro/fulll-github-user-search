import styles from './SearchBar.module.css';

export default function SearchBar() {
	return (
		<input
			type="text"
			placeholder="Search input"
			className={styles.input}
		/>
	);
}
