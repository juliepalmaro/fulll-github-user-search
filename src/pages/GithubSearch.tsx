import styles from './GithubSearch.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import UserList from '../components/User/UserList';
import { User } from '../types/userType';
import Actions from '../components/Actions/Actions';

const users: User[] = [
	{
		id: '1',
		login: 'user1',
		avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
	},
	{
		id: '2',
		login: 'user2',
		avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
	},
	{
		id: '3',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '4',
		login: 'user3',
		avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
	},
	{
		id: '5',
		login: 'user3',
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
	// Ajoute d'autres utilisateurs ici
];

export default function GithubSearch() {
	return (
		<>
			<p className={styles.title}>Github Search</p>
			<SearchBar />
			<Actions />
			<UserList users={users} />
		</>
	);
}
