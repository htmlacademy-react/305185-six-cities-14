import styles from './spinner.module.css';

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerLoader}></div>
    </div>
  );
}
