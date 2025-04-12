import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Actions from './Actions'; // Le composant à tester
import { User } from '../../types/userType';

describe('Actions', () => {
	const mockUsers: User[] = [
		{ id: 1, login: 'user1', avatar_url: 'http://example.com/avatar1.jpg' },
		{ id: 2, login: 'user2', avatar_url: 'http://example.com/avatar2.jpg' },
	];

	const setSelectedUsers = vi.fn();
	const setUsers = vi.fn();

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
		expect(selectedCount).toBeInTheDocument();
	});

	it('should call handleDuplicateUsers when we click on dupplicate button', () => {
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
	});

	it('should call handleDeleteUsers when we click on delete button', () => {
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
});
