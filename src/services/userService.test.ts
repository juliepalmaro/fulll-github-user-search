// userService.test.ts
import { getUsers, duplicateUsers, deleteUsers } from './userService';
import { User } from '../types/userType';
import { describe, expect, it, vi } from 'vitest';

// Mocking fetch
globalThis.fetch = vi.fn();

describe('getUsers', () => {
	it('should return users when API call is successful', async () => {
		const mockUsers = [
			{ id: 1, login: 'julie', avatar_url: 'url' },
			{ id: 2, login: 'theo', avatar_url: 'url' },
		];

		(fetch as vi.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ items: mockUsers }),
		});

		const setError = vi.fn();
		const users = await getUsers('julie', setError);

		expect(users).toEqual(mockUsers);
	});
});

describe('duplicateUsers', () => {
	it('should duplicate selected users with new ids', () => {
		const users: User[] = [
			{ id: 1, login: 'julie', avatar_url: 'url' },
			{ id: 2, login: 'theo', avatar_url: 'url' },
		];
		const selectedIds = new Set([1]);

		const result = duplicateUsers(selectedIds, users);
		expect(result.length).toBe(3);
		expect(result[result.length - 1].id).toBeGreaterThan(2); // Ensure duplicated id is unique
	});
});

describe('deleteUsers', () => {
	it('should delete selected users', () => {
		const users: User[] = [
			{ id: 1, login: 'julie', avatar_url: 'url' },
			{ id: 2, login: 'theo', avatar_url: 'url' },
		];
		const selectedIds = new Set([1]);

		const result = deleteUsers(selectedIds, users);
		expect(result.length).toBe(1);
		expect(result[0].id).toBe(2); // Only the user with id 2 should remain
	});
});
