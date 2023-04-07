import { Tweet } from '../Tweet/Tweet';
import styles from './Home.module.scss';
import React from 'react';
import { db } from '../../helpers/firebase';
import { collection, getDocs } from 'firebase/firestore';
import format from 'date-fns/format';

export const Home = () => {
  const [feed, setFeed] = React.useState('for you');
  const [tweets, setTweets] = React.useState();

  const getTweets = async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, 'tweets'));
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setTweets(arr);
  };

  React.useEffect(() => {
    getTweets();
  }, []);

  const displayTweets =
    tweets &&
    tweets.map((data, i) => {
      const date = new Date(data.date.seconds * 1000);
      const formattedDate = format(date, 'MMM q');

      return (
        <Tweet
          profilePicture={data.profilePicture}
          displayName={data.displayName}
          username={data.username}
          date={formattedDate}
          text={data.text}
          liked={data.liked}
          key={i}
        />
      );
    });

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
