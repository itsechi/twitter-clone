import styles from './Home.module.scss';
import React from 'react';

export const Home = () => {
  const [feed, setFeed] = React.useState('for you');

  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Home</h2>
      <nav className={styles.nav}>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('for you')}
        >
          <span className={styles.navText}>
            For you<div className={feed === 'for you' && styles.active}></div>
          </span>
        </a>
        <a
          className={styles.navLink}
          href="#"
          onClick={() => setFeed('following')}
        >
          <span className={styles.navText}>
            Following
            <div className={feed === 'following' && styles.active}></div>
          </span>
        </a>
      </nav>
    </main>
  );
};
