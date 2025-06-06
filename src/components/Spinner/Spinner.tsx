import styles from './Spinner.module.css';

export default function Spinner() {
	return (
		<div className={styles.spinner} data-testid="spinner">
			<div className={styles['lds-dual-ring']}></div>
		</div>
	);
}
