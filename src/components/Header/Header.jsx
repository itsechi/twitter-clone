import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
  const [active, setActive] = React.useState('home');
  const { loggedUser } = props;

  return (
    <header className={styles.header}>
      <div className={styles.headerFixed}>
        <Link
          to="/home"
          className={styles.logoLink}
          onClick={() => setActive('home')}
        >
          <svg>
            <use href={`${icons}#twitter`}></use>
          </svg>
        </Link>
        <Link
          to="/home"
          className={styles.headerLink}
          onClick={() => setActive('home')}
        >
          <svg>
            <use
              href={
                active === 'home' ? `${icons}#homeClicked` : `${icons}#home`
              }
            ></use>
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

        {loggedUser && (
          <>
            <Link
              to={`/${loggedUser.username}`}
              className={styles.headerLink}
              onClick={() => setActive('profile')}
            >
              <svg>
                <use
                  href={
                    active === 'profile'
                      ? `${icons}#profileClicked`
                      : `${icons}#profile`
                  }
                ></use>
              </svg>
              <span
                className={[
                  styles.headerText,
                  active === 'profile' ? styles.active : '',
                ].join(' ')}
              >
                Profile
              </span>
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
