import { User } from '../types/userType';

export const getUsers = async (query: string): Promise<User[]> => {
	if (!query.trim()) return [];
	try {
		const response = await fetch(
			`https://api.github.com/search/users?q=${query}`
		);
		if (!response.ok) {
			throw new Error('API Error');
		}
		const data = await response.json();
		return data.items.map((user: User) => ({
			id: user.id,
			login: user.login,
			avatar_url: user.avatar_url,
		}));
	} catch (error) {
		console.error(error);
		throw error;
	}
};
