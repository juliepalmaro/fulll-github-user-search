import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // pour les tests avec Vitest
import UserList from './UserList'; // Le composant à tester
import { User } from '../../types/userType';

describe('UserList', () => {
	const mockUsers: User[] = [
		{ id: 1, login: 'user1', avatar_url: 'http://example.com/avatar1.jpg' },
		{ id: 2, login: 'user2', avatar_url: 'http://example.com/avatar2.jpg' },
	];

	it('should print user list', () => {
		const setSelectedUsers = vi.fn();

		render(
			<UserList
				users={mockUsers}
				selectedUsers={new Set()}
				setSelectedUsers={setSelectedUsers}
			/>
		);

		expect(screen.getByText('user1')).toBeInTheDocument();
		expect(screen.getByText('user2')).toBeInTheDocument();
	});

	it('should print a message when the list is empty', () => {
		const setSelectedUsers = vi.fn();
		render(
			<UserList
				users={[]}
				selectedUsers={new Set()}
				setSelectedUsers={setSelectedUsers}
			/>
		);
		expect(screen.getByText('No user found')).toBeInTheDocument();
	});
});
