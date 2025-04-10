import styles from './GithubSearch.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import UserList from '../components/User/UserList';
import { User } from '../types/userType';
import Actions from '../components/Actions/Actions';
import { useEffect, useState } from 'react';

const users: User[] = [
	{
		id: '1',
		login: 'user1',
		avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
	},
	{
		id: '2',
		login: 'abc',
		avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
	},
	{
		id: '3',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '4',
		login: 'def',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '5',
		login: 'abc',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '6',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '7',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '8',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
];

export default function GithubSearch() {
	const [filterText, setFilterText] = useState('');
	const [debouncedFilterText, setDebouncedFilterText] = useState(filterText);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedFilterText(filterText);
		}, 200);
		return () => clearTimeout(timer);
	}, [filterText]);

	const filteredUsers = users.filter((user) => {
		return user.login
			.toLowerCase()
			.includes(debouncedFilterText.toLowerCase());
	});
	return (
		<>
			<p className={styles.title}>Github Search</p>
			<SearchBar
				filterText={filterText}
				onFilterTextChange={setFilterText}
			/>
			<Actions />
			<UserList users={filteredUsers} />
		</>
	);
}
