import styles from './GithubSearch.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import UserList from '../components/User/UserList';
import { User } from '../types/userType';
import Actions from '../components/Actions/Actions';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

export default function GithubSearch() {
	const [filterText, setFilterText] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// filter text empty
		if (!filterText.trim()) {
			setUsers([]);
			return;
		}

		const timeoutId = setTimeout(() => {
			const getData = async () => {
				// setLoading(true);
				setError(null);

				try {
					const result = await getUsers(filterText);
					setUsers(result);
				} catch (err) {
					setError('Error when loading users : ');
				}
				// finally {
				// 	setLoading(false);
				// }
			};
			getData();
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [filterText]);

	return (
		<>
			<p className={styles.title}>Github Search</p>
			<SearchBar
				filterText={filterText}
				onFilterTextChange={setFilterText}
			/>
			<Actions />
			<UserList users={users} />
		</>
	);
}
