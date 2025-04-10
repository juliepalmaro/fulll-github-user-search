import binIcon from '../../assets/images/bin.png';
import duplicateIcon from '../../assets/images/duplicate.png';
import styles from './Actions.module.css';

export default function Actions() {
	return (
		<div className={styles.actions}>
			<div>
				<input
					type="checkbox"
					id="selectAll"
					className={styles.selectAll}
					aria-label="Select or deselect all users"
				/>
				<label htmlFor="selectAll">
					<span className={styles.selectedCount}>X</span> elements
					selected
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
