import styles from './GithubSearch.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import UserList from '../components/User/UserList';
import { User } from '../types/userType';
import Actions from '../components/Actions/Actions';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import Spinner from '../components/Spinner/Spinner';

export default function GithubSearch() {
	const [filterText, setFilterText] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// filter text empty
		if (!filterText) {
			setUsers([]);
			return;
		}

		setIsLoading(true);
		const timeoutId = setTimeout(() => {
			const getData = async () => {
				setError(null);
				try {
					const result = await getUsers(filterText);
					setUsers(result);
				} catch (err) {
					setError('Error when loading users : ');
				} finally {
					setIsLoading(false);
				}
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
			{isLoading && <Spinner />}
			<UserList users={users} />
		</>
	);
}
