import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Actions from './Actions';
import { User } from '../../types/userType';

describe('Actions', () => {
	let mockUsers: User[];
	let setSelectedUsers: vi.Mock;
	let setUsers: vi.Mock;

	beforeEach(() => {
		mockUsers = [
			{
				id: 1,
				login: 'user1',
				avatar_url: 'http://example.com/avatar1.jpg',
			},
			{
				id: 2,
				login: 'user2',
				avatar_url: 'http://example.com/avatar2.jpg',
			},
		];

		setSelectedUsers = vi.fn();
		setUsers = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should update the number of selected items', () => {
		const selectedUsers = new Set([1]);

		render(
			<Actions
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				users={mockUsers}
				setUsers={setUsers}
			/>
		);

		const selectedCount = screen.getByTestId('selected-count');
		expect(selectedCount.textContent).toEqual('1');
	});

	it('should duplicate selected users', () => {
		const selectedUsers = new Set([1]);

		render(
			<Actions
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				users={mockUsers}
				setUsers={setUsers}
			/>
		);

		const duplicateButton = screen.getByAltText('Duplicate');
		fireEvent.click(duplicateButton);
		expect(setUsers).toHaveBeenCalled();

		const updatedUsers = setUsers.mock.calls[0][0];
		const occurrences = updatedUsers.filter(
			(u: User) => u.login === 'user1'
		);
		expect(occurrences.length).toBe(2);
	});

	it('should delete selected user', () => {
		const selectedUsers = new Set([1]);

		render(
			<Actions
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				users={mockUsers}
				setUsers={setUsers}
			/>
		);

		const deleteButton = screen.getByAltText('Bin');
		fireEvent.click(deleteButton);
		expect(setUsers).toHaveBeenCalled();
		const updatedUsers = setUsers.mock.calls[0][0];
		const deletedUserStillExists = updatedUsers.some(
			(u: User) => u.id === 1
		);
		expect(deletedUserStillExists).toBe(false);
	});

	it('should print indeterminate box when some users are selected', () => {
		const selectedUsers = new Set([1]);

		render(
			<Actions
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				users={mockUsers}
				setUsers={setUsers}
			/>
		);

		const selectAllCheckbox = screen.getByLabelText(
			'Select or deselect all users'
		);
		expect(selectAllCheckbox).toHaveProperty('indeterminate', true);
	});

	it('should select all users when we click on select all box', () => {
		const selectedUsers = new Set([]);

		render(
			<Actions
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				users={mockUsers}
				setUsers={setUsers}
			/>
		);

		const selectAllCheckbox = screen.getByLabelText(
			'Select or deselect all users'
		);
		fireEvent.click(selectAllCheckbox);
		expect(setSelectedUsers).toHaveBeenCalled();
		const updatedSelectedUsers = setSelectedUsers.mock.calls[0][0];
		const allUserIds = new Set(mockUsers.map((user) => user.id));
		expect(Array.from(updatedSelectedUsers)).toEqual(
			Array.from(allUserIds)
		);
	});
});
