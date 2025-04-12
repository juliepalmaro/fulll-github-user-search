// UserItem.test.tsx
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

		expect(screen.getByText('1')).toBeInTheDocument(); // id
		expect(screen.getByText('johndoe')).toBeInTheDocument(); // login
		expect(screen.getByAltText('Avatar')).toBeInTheDocument(); // avatar
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

	// it('should add user to selected when checkbox is clicked', () => {
	// 	const mockSetSelectedUsers = vi.fn();

	// 	render(
	// 		<UserItem
	// 			user={mockUser}
	// 			selectedUsers={new Set()}
	// 			setSelectedUsers={mockSetSelectedUsers}
	// 		/>
	// 	);

	// 	const checkbox = screen.getByRole('checkbox');
	// 	expect(checkbox).not.toBeChecked();
	// 	fireEvent.click(checkbox);
	// 	expect(mockSetSelectedUsers).toHaveBeenCalled();
	// 	const args = mockSetSelectedUsers.mock.calls[0];
	// 	console.log(
	// 		'Arguments passed to mockSetSelectedUsers: ',
	// 		mockSetSelectedUsers.mock.calls[0]
	// 	);

	// 	expect(Array.from(args[0])).toEqual([1]);
	// });
});
