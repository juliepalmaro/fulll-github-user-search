import styles from './GithubSearch.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import UserList from '../components/User/UserList';
import binIcon from '../assets/images/bin.png'; // Image poubelle
import duplicateIcon from '../assets/images/duplicate.png'; // Image feuille

export default function GithubSearch() {
	return (
		<div>
			<p className={styles.title}>Github Search</p>
			<SearchBar />
			<div className={styles.actions}>
				<div>
					<input
						type="checkbox"
						id="selectAll"
						className={styles.selectAll}
					/>
					<label htmlFor="selectAll">
						<span className={styles.count}>X</span> elements
						selected
					</label>
				</div>

				<div className={styles.buttons}>
					<img
						src={duplicateIcon}
						alt="Duplicate"
						className={styles.buttonIcon}
					/>
					<img
						src={binIcon}
						alt="Bin"
						className={styles.buttonIcon}
					/>
				</div>
			</div>
			<UserList />
		</div>
	);
}
