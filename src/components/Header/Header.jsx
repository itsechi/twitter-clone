import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';

export const Header = (props) => {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.headerLink}>
          <svg>
            <use href={`${icons}#home`}></use>
          </svg>
          <span className={styles.headerText}>Home</span>
        </div>

        <div className={styles.headerLink}>
          <svg>
            <use href={`${icons}#profile`}></use>
          </svg>
          <span className={styles.headerText}>Profile</span>
        </div>

        <div className={styles.headerLink} onClick={props.signOut}>
          <svg>
            <use href={`${icons}#more`}></use>
          </svg>
          <span className={styles.headerText}>Log out</span>
        </div>
      </div>
    </header>
  );
};
