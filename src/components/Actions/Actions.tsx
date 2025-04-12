import { useEffect, useRef } from 'react';
import binIcon from '../../assets/images/bin.png';
import duplicateIcon from '../../assets/images/duplicate.png';
import { User } from '../../types/userType';
import styles from './Actions.module.css';

export default function Actions({
	selectedUsers,
	setSelectedUsers,
	users,
}: {
	selectedUsers: Set<number>;
	setSelectedUsers: (value: Set<number>) => void;
	users: User[];
}) {
	const handleSelectAllChange = () => {
		const allSelected = selectedUsers.size === users.length;
		setSelectedUsers(
			allSelected ? new Set() : new Set(users.map((user) => user.id))
		);
	};

	const areAllSelected =
		users.length > 0 && selectedUsers.size === users.length;
	const areSomeSelected =
		selectedUsers.size > 0 && selectedUsers.size < users.length;
	const checkboxRef = useRef<HTMLInputElement | null>(null);

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
					className={styles.selectAll}
					aria-label="Select or deselect all users"
					checked={areAllSelected}
					onChange={handleSelectAllChange}
				/>
				<label htmlFor="selectAll">
					<span className={styles.selectedCount}>
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
				/>
				<img src={binIcon} alt="Bin" className={styles.actionIcon} />
			</div>
		</div>
	);
}
