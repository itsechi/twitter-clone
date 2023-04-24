import { Tweet } from '../Tweet/Tweet';
import React from 'react';
import { db } from '../../helpers/firebase';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { TweetInput } from '../TweetInput/TweetInput';

export const Tweets = (props) => {
  const [tweets, setTweets] = React.useState();

  const getTweets = async (user = props.author) => {
    let data = [];
    let querySnapshot;
    if (user) {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        where('username', '==', user),
        orderBy('date', 'desc')
      );
      querySnapshot = await getDocs(tweetsQuery);
    } else {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('date', 'desc')
      );
      querySnapshot = await getDocs(tweetsQuery);
    }
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    await Promise.all(
      data.map(async (tweet) => {
        let user = await getUser(tweet.user);
        tweet.user = user;
      })
    );
    setTweets(data);
    props.setTweets && props.setTweets(data.length);
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
  }, [props.author]);

  const displayTweets =
    tweets &&
    tweets.map((data, i) => {
      return (
        <Tweet
          user={props.user}
          key={i}
          openModal={props.openModal}
          data={data}
        />
      );
    });

  return (
    <>
      {props.user && <TweetInput getTweets={getTweets} user={props.user} />}
      <section>{displayTweets}</section>
    </>
  );
};
