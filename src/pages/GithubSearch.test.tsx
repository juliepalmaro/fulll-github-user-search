import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import GithubSearch from './GithubSearch';

vi.mock('../services/userService', () => ({
	getUsers: vi.fn(() => Promise.resolve([{ id: 1, login: 'julie' }])),
}));

describe('GithubSearch', () => {
	it('should display the title', () => {
		render(<GithubSearch />);
		expect(screen.getByText('Github Search')).toBeInTheDocument();
	});

	it('should show Spinner while loading and call getUsers after typing', async () => {
		render(<GithubSearch />);
		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'julie');
		expect(await screen.findByTestId('spinner')).toBeInTheDocument();

		const { getUsers } = await import('../services/userService');
		await waitFor(() =>
			expect(getUsers).toHaveBeenCalledWith('julie', expect.any(Function))
		);
	});
});
