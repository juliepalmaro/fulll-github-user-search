import styles from './SearchBar.module.css';

export default function SearchBar({
	filterText,
	onFilterTextChange,
}: {
	filterText: string;
	onFilterTextChange: (value: string) => void;
}) {
	return (
		<input
			type="text"
			placeholder="Search input"
			className={styles.searchInput}
			aria-label="Search"
			value={filterText}
			onChange={(e) => onFilterTextChange(e.target.value)}
		/>
	);
}
