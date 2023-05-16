import styles from './Header.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const Header = (props) => {
  const [active, setActive] = React.useState('home');

  return (
    <header className={styles.header}>
      <div className={styles.headerFixed}>
        <div>
          <Link
            to="/home"
            className={styles.logoLink}
            onClick={() => setActive('home')}
          >
            <Icon name="twitter" />
          </Link>

          <Link
            to="/home"
            className={styles.headerLink}
            onClick={() => setActive('home')}
          >
            <Icon name={active === 'home' ? 'homeClicked' : 'home'} />
            <span
              className={[
                styles.headerText,
                active === 'home' ? 'textBold' : '',
              ].join(' ')}
            >
              Home
            </span>
          </Link>

          {props.loggedUser && (
            <>
              <Link
                to={`/${props.loggedUser.username}`}
                className={styles.headerLink}
                onClick={() => setActive('profile')}
              >
                <Icon
                  name={active === 'profile' ? 'profileClicked' : 'profile'}
                />
                <span
                  className={[
                    styles.headerText,
                    active === 'profile' ? 'textBold' : '',
                  ].join(' ')}
                >
                  Profile
                </span>
              </Link>

              <div className={styles.headerLink} onClick={props.signOut}>
                <Icon name="more" />
                <span className={styles.headerText}>Log out</span>
              </div>
            </>
          )}
        </div>

        {props.loggedUser && (
          <Link
            to={`/${props.loggedUser.username}`}
            className={[styles.headerLink, styles.account].join(' ')}
          >
            <img
              className={[styles.profilePic, 'profilePic'].join(' ')}
              src={props.loggedUser.profilePicture}
            ></img>
            <div className={styles.accountInfo}>
              <p className="textBold">{props.loggedUser.displayName}</p>
              <p className="textGray">@{props.loggedUser.username}</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};
