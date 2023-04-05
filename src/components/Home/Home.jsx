import { Tweet } from '../Tweet/Tweet';
import styles from './Home.module.scss';
import React from 'react';
import { placeholderData } from '../../placeholderData';

export const Home = () => {
  const [feed, setFeed] = React.useState('for you');
  const displayTweets = placeholderData.map((data, i) => (
    <Tweet
      displayName={data.displayName}
      username={data.username}
      date={data.date}
      text={data.text}
      liked={data.liked}
      key={i}
    />
  ));

  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Home</h2>
      <nav className={styles.nav}>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('for you')}
        >
          <span
            className={[
              styles.navText,
              feed === 'for you' ? styles.navTextActive : '',
            ].join(' ')}
          >
            For you
            <div className={feed === 'for you' ? styles.active : ''}></div>
          </span>
        </a>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('following')}
        >
          <span
            className={[
              styles.navText,
              feed === 'following' && styles.navTextActive,
            ].join(' ')}
          >
            Following
            <div className={feed === 'following' ? styles.active : ''}></div>
          </span>
        </a>
      </nav>
      <section>{displayTweets}</section>
    </main>
  );
};
