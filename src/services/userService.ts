export const getUsers = async (
	searchText: string,
	setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
	let retries = 5; // Nombre de tentatives avant d'abandonner
	let delay = 1000; // Délai initial entre les tentatives (en ms)

	while (retries > 0) {
		try {
			const response = await fetch(
				`https://api.github.com/search/users?q=${searchText}`
			);

			// Si la requête est réussie, on la retourne
			if (response.ok) {
				const data = await response.json();
				setError(null);
				return data.items; // Retourner les utilisateurs
			}

			// Si on atteint une erreur de rate limit (code 403 ou 429)
			if (response.status === 403 || response.status === 429) {
				const rateLimitRemaining = response.headers.get(
					'x-ratelimit-remaining'
				);
				const rateLimitReset =
					response.headers.get('x-ratelimit-reset');
				const retryAfter = response.headers.get('retry-after');

				// Vérifier si l'en-tête retry-after est présent
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
				// Vérifier l'en-tête x-ratelimit-reset
				else if (rateLimitRemaining === '0' && rateLimitReset) {
					const resetTime = parseInt(rateLimitReset, 10) * 1000; // Convertir en ms
					const currentTime = Date.now();
					const waitTime = resetTime - currentTime; // Attendre jusqu'à la réinitialisation

					setError(
						`Rate limit exceeded, please wait until the limit is reset...`
					);
					await new Promise((resolve) =>
						setTimeout(resolve, waitTime)
					);
				} else {
					// Si aucune information n'est disponible, on attend au moins 1 minute
					setError(
						'Rate limit exceeded, please wait for 1 minute...'
					);
					await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 minute
				}
			}
		} catch (error) {
			console.error('Error fetching users:', error);
			setError('An error occurred while fetching users.');
		}

		// On réduit le nombre de tentatives et on augmente le délai entre les tentatives
		retries -= 1;
		delay *= 2; // Attente exponentielle entre les tentatives
		await new Promise((resolve) => setTimeout(resolve, delay)); // Attente avant la prochaine tentative
	}

	throw new Error('Failed to fetch users after multiple retries.');
};
