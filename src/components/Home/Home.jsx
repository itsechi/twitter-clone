import { Tweet } from '../Tweet/Tweet';
import styles from './Home.module.scss';
import React from 'react';
import { db } from '../../helpers/firebase';
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { Nav } from '../Nav/Nav';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');
  const [tweets, setTweets] = React.useState();

  const getTweets = async () => {
    let data = [];
    const querySnapshot = await getDocs(collection(db, 'tweets'));
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    await Promise.all(
      data.map(async (tweet) => {
        let user = await getUser(tweet.user);
        tweet.user = user;
      })
    );
    setTweets(data);
  };

  const getUser = async (ref) => {
    const docRef = ref;
    const docSnap = await getDoc(docRef);
    let user;

    if (docSnap.exists()) user = docSnap.data();
    return user;
  };

  React.useEffect(() => {
    getTweets();
  }, []);

  const displayTweets =
    tweets &&
    tweets.map((data, i) => {
      console.log(data);
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
