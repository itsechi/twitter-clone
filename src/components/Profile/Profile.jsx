import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';

export const Profile = (props) => {
  const routeParams = useParams();
  const { user } = props;
  const username = user.email.split('@')[0];
  const [feed, setFeed] = React.useState('tweets');

  return (
    <main className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg>
            <use href={`${icons}#back`}></use>
          </svg>
        </div>
        <div className={styles.headerText}>
          <h2 className={styles.headerTextLarge}>{user.displayName}</h2>
          <p>0 Tweets</p>
        </div>
      </div>

      <div className={styles.images}>
        <img
          className={styles.banner}
          src="https://pbs.twimg.com/profile_banners/1557764542821765121/1680197453/600x200"
        ></img>
        <img
          className={styles.profilePic}
          src="https://pbs.twimg.com/profile_images/1368996766364831749/yJLY51UF_400x400.jpg"
        ></img>
      </div>

      <div className={styles.info}>
        <div className={styles.followBar}>
          <button className={styles.followBtn}>Follow</button>
        </div>

        <h2 className={styles.displayName}>{user.displayName}</h2>
        <p className={styles.username}>@{username}</p>
        <p className={styles.description}>
          User description here. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptatibus, adipisci.
        </p>
      </div>

      <nav className={styles.nav}>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('tweets')}
        >
          <span
            className={[
              styles.navText,
              feed === 'tweets' ? styles.navTextActive : '',
            ].join(' ')}
          >
            Tweets
            <div className={feed === 'tweets' ? styles.active : ''}></div>
          </span>
        </a>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('replies')}
        >
          <span
            className={[
              styles.navText,
              feed === 'replies' && styles.navTextActive,
            ].join(' ')}
          >
            Replies
            <div className={feed === 'replies' ? styles.active : ''}></div>
          </span>
        </a>

        <a className={styles.navLink} href="#" onClick={() => setFeed('media')}>
          <span
            className={[
              styles.navText,
              feed === 'media' && styles.navTextActive,
            ].join(' ')}
          >
            Media
            <div className={feed === 'media' ? styles.active : ''}></div>
          </span>
        </a>

        <a className={styles.navLink} href="#" onClick={() => setFeed('likes')}>
          <span
            className={[
              styles.navText,
              feed === 'likes' && styles.navTextActive,
            ].join(' ')}
          >
            Likes
            <div className={feed === 'likes' ? styles.active : ''}></div>
          </span>
        </a>
      </nav>
    </main>
  );
};
