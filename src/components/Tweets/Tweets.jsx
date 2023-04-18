import { Tweet } from '../Tweet/Tweet';
import React from 'react';
import { db } from '../../helpers/firebase';
import { collection, getDocs, getDoc, query, where } from 'firebase/firestore';

export const Tweets = (props) => {
  const [tweets, setTweets] = React.useState();

  const getTweets = async (user = props.user) => {
    let data = [];
    let querySnapshot;
    if (user) {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        where('username', '==', user)
      );
      querySnapshot = await getDocs(tweetsQuery);
    } else {
      querySnapshot = await getDocs(collection(db, 'tweets'));
    }
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
      return <Tweet key={i} openModal={props.openModal} data={data} />;
    });

  return <section>{displayTweets}</section>;
};
