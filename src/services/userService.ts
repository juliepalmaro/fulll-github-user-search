import { User } from '../types/userType';

export const getUsers = async (
	searchText: string,
	setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
	let retries = 5; // Number of tries before leaving
	let delay = 1000; // Delay between tries

	while (retries > 0) {
		try {
			const response = await fetch(
				`https://api.github.com/search/users?q=${searchText}`
			);

			// If successfull request return users
			if (response.ok) {
				const data = await response.json();
				setError(null);
				return data.items;
			}

			// If rate limit error (403 or 429)
			if (response.status === 403 || response.status === 429) {
				const rateLimitRemaining = response.headers.get(
					'x-ratelimit-remaining'
				);
				const rateLimitReset =
					response.headers.get('x-ratelimit-reset');
				const retryAfter = response.headers.get('retry-after');

				// Verify retry-after header exists
				if (retryAfter) {
					const waitTime = parseInt(retryAfter, 10) * 1000; // Temps d'attente en ms
					setError(
						`Rate limit exceeded, please wait for ${
							waitTime / 1000
						} seconds...`
					);
					await new Promise((resolve) =>
						setTimeout(resolve, waitTime)
					);
				}
				// Verify x-ratelimit-reset header
				else if (rateLimitRemaining === '0' && rateLimitReset) {
					const resetTime = parseInt(rateLimitReset, 10) * 1000; // Convert to ms
					const currentTime = Date.now();
					const waitTime = resetTime - currentTime; // Wait until reset

					setError(
						`Rate limit exceeded, please wait until the limit is reset...`
					);
					await new Promise((resolve) =>
						setTimeout(resolve, waitTime)
					);
				} else {
					// If no info, wait at least 1 minute
					setError(
						'Rate limit exceeded, please wait for 1 minute...'
					);
					await new Promise((resolve) => setTimeout(resolve, 60000));
				}
			}
		} catch (error) {
			console.error('Error fetching users:', error);
			setError('An error occurred while fetching users.');
		}

		retries -= 1;
		delay *= 2;
		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	throw new Error('Failed to fetch users after multiple retries.');
};

export const duplicateUsers = (
	selectedIds: Set<number>,
	users: User[]
): User[] => {
	const selectedUsers = users.filter((user) => selectedIds.has(user.id));
	const duplicatedUsers = selectedUsers.map((user) => ({
		...user,
		id: user.id + Date.now(),
	}));
	return [...users, ...duplicatedUsers];
};

export const deleteUsers = (
	selectedIds: Set<number>,
	users: User[]
): User[] => {
	return users.filter((user) => !selectedIds.has(user.id));
};
