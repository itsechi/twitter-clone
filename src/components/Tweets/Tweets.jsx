import { Tweet } from '../Tweet/Tweet';
import { TweetInput } from '../TweetInput/TweetInput';
import { getUserFromRef } from '../../helpers/getUserFromRef';
import React from 'react';
import { db } from '../../helpers/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

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
    } else if (props.feed === 'Following') {
      if (!props.loggedUser) return setTweets([]);
      const ids = props.loggedUser.following.map((user) => user.id);
      if (ids.length < 1) return setTweets('');
      const tweetsQuery = query(
        collection(db, 'tweets'),
        where('username', 'in', ids),
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
        let user = await getUserFromRef(tweet.user);
        tweet.user = user;
      })
    );
    setTweets(data);
    props.setTweets && props.setTweets(data.length);
  };

  React.useEffect(() => {
    getTweets();
  }, [props.author, props.feed]);

  const displayTweets =
    tweets &&
    tweets.map((data) => {
      return (
        <Tweet
          loggedUser={props.loggedUser}
          key={data.id}
          openModal={props.openModal}
          data={data}
        />
      );
    });

  return (
    <>
      {props.loggedUser && !props.author && (
        <TweetInput getTweets={getTweets} loggedUser={props.loggedUser} />
      )}
      <section>{displayTweets}</section>
    </>
  );
};
