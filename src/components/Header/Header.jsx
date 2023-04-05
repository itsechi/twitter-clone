import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLink}>
        <svg>
          <use href={`${icons}#home`}></use>
        </svg>
        <span className={styles.headerText}>Home</span>
      </div>
    </header>
  );
};
