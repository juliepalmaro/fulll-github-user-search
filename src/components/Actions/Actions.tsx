import { useEffect, useRef } from 'react';
import binIcon from '../../assets/images/bin.png';
import duplicateIcon from '../../assets/images/duplicate.png';
import styles from './Actions.module.css';
import { deleteUsers, duplicateUsers } from '../../services/userService';
import { User } from '../../types/userType';

export default function Actions({
	selectedUsers,
	setSelectedUsers,
	users,
	setUsers,
}: {
	selectedUsers: Set<number>;
	setSelectedUsers: (value: Set<number>) => void;
	users: User[];
	setUsers: (value: User[]) => void;
}) {
	const areAllSelected =
		users.length > 0 && selectedUsers.size === users.length;
	const areSomeSelected =
		selectedUsers.size > 0 && selectedUsers.size < users.length;
	const checkboxRef = useRef<HTMLInputElement | null>(null);

	const handleSelectAllChange = () => {
		const allSelected = selectedUsers.size === users.length;
		setSelectedUsers(
			allSelected ? new Set() : new Set(users.map((user) => user.id))
		);
	};

	const handleDuplicateUsers = () => {
		setUsers(duplicateUsers(selectedUsers, users));
		setSelectedUsers(new Set());
	};

	const handleDeleteUsers = () => {
		setUsers(deleteUsers(selectedUsers, users));
		setSelectedUsers(new Set());
	};

	useEffect(() => {
		if (checkboxRef.current) {
			checkboxRef.current.indeterminate = areSomeSelected;
		}
	}, [areSomeSelected]);
	return (
		<div className={styles.actions}>
			<div>
				<input
					ref={checkboxRef}
					type="checkbox"
					id="selectAll"
					data-testid="selectAll"
					className={styles.selectAll}
					aria-label="Select or deselect all users"
					checked={areAllSelected}
					onChange={handleSelectAllChange}
				/>
				<label htmlFor="selectAll">
					<span
						className={styles.selectedCount}
						data-testid="selected-count"
					>
						{selectedUsers.size}
					</span>{' '}
					elements selected
				</label>
			</div>

			<div className={styles.buttons}>
				<img
					src={duplicateIcon}
					alt="Duplicate"
					className={styles.actionIcon}
					onClick={handleDuplicateUsers}
				/>
				<img
					src={binIcon}
					alt="Bin"
					className={styles.actionIcon}
					onClick={handleDeleteUsers}
				/>
			</div>
		</div>
	);
}
