import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserItem from './UserItem';
import { User } from '../../types/userType';

describe('UserItem', () => {
	const mockUser: User = {
		id: 1,
		login: 'johndoe',
		avatar_url: 'https://example.com/avatar.jpg',
	};

	it('should display the user info', () => {
		render(
			<UserItem
				user={mockUser}
				selectedUsers={new Set()}
				setSelectedUsers={() => {}}
			/>
		);

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('johndoe')).toBeInTheDocument();
		expect(screen.getByAltText('Avatar')).toBeInTheDocument();
	});

	it('should checked the checkbox if the user is selected', () => {
		render(
			<UserItem
				user={mockUser}
				selectedUsers={new Set([1])}
				setSelectedUsers={() => {}}
			/>
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('should toggle user selection when checkbox is clicked', () => {
		const mockSetSelectedUsers = vi.fn();

		render(
			<UserItem
				user={mockUser}
				selectedUsers={new Set()}
				setSelectedUsers={mockSetSelectedUsers}
			/>
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
		fireEvent.click(checkbox);
		expect(mockSetSelectedUsers).toHaveBeenCalled();
		const updateFn = mockSetSelectedUsers.mock.calls[0][0];
		expect(typeof updateFn).toBe('function');
		const result = updateFn(new Set());
		expect(Array.from(result)).toEqual([1]);

		fireEvent.click(checkbox);
		expect(mockSetSelectedUsers).toHaveBeenCalled();
		const result2 = updateFn(new Set([1]));
		expect(Array.from(result2)).toEqual([]);
	});
});
