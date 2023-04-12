import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';

export const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLink}>
        <svg>
          <use href={`${icons}#home`}></use>
        </svg>
        <span className={styles.headerText}>Home</span>
      </div>

      {/* for testing only */}
      <div className={styles.headerLink} onClick={props.signOut}>
        <span className={styles.headerText}>Log out</span>
      </div>
    </header>
  );
};
