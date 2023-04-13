import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
  const [active, setActive] = React.useState('home');
  const user = props.user;
  const username = user && props.user.email.split('@')[0];

  return (
    <header className={styles.header}>
      <div>
        <Link to="/home" className={styles.headerLink}>
          <svg>
            <use href={`${icons}#home`}></use>
          </svg>
          <span
            className={[
              styles.headerText,
              active === 'home' ? styles.active : '',
            ].join(' ')}
          >
            Home
          </span>
        </Link>

        {user && (
          <>
            <Link to={`/${username}`} className={styles.headerLink}>
              <svg>
                <use href={`${icons}#profile`}></use>
              </svg>
              <span className={styles.headerText}>Profile</span>
            </Link>

            <div className={styles.headerLink} onClick={props.signOut}>
              <svg>
                <use href={`${icons}#more`}></use>
              </svg>
              <span className={styles.headerText}>Log out</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
