import { Tweet } from '../Tweet/Tweet';
import styles from './Home.module.scss';
import React from 'react';
import { db } from '../../helpers/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Nav } from '../Nav/Nav';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');
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
      return (
        <Tweet
          key={i}
          openModal={props.openModal}
          user={props.user}
          data={data}
        />
      );
    });

  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Home</h2>
      <Nav feed={feed} setFeed={setFeed} ids={['For you', 'Following']} />
      <section>{displayTweets}</section>
    </main>
  );
};
