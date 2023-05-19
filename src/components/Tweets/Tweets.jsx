import styles from './Tweets.module.scss';
import { Tweet } from '../Tweet/Tweet';
import { TweetInput } from '../TweetInput/TweetInput';
import React from 'react';

// firebase
import { db } from '../../helpers/firebase';
import { getUserFromRef } from '../../helpers/getUserFromRef';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Spinner } from '../Spinner/Spinner';

export const Tweets = (props) => {
  const [tweets, setTweets] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  React.useEffect(() => {
    getTweets();
  }, [props.author, props.feed, props.loggedUser]);

  const getTweets = async (user = props.author) => {
    setSpinner(true);
    let data = [];
    let tweetsQuery;

    // tweets from specific user on their profile
    if (user) {
      if (props.feed !== 'Tweets') {
        setTweets([]);
        return setSpinner(false);
      } else {
        tweetsQuery = query(
          collection(db, 'tweets'),
          where('username', '==', user),
          orderBy('date', 'desc')
        );
      }

      // the following tab
    } else if (props.feed === 'Following') {
      const users =
        props.loggedUser && props.loggedUser.following.map((user) => user.id);
      if (!props.loggedUser || users.length < 1) {
        setTweets([]);
        return setSpinner(false);
      } else {
        tweetsQuery = query(
          collection(db, 'tweets'),
          where('username', 'in', users),
          orderBy('date', 'desc')
        );
      }

      // the home feed, tweets from all users
    } else {
      tweetsQuery = query(collection(db, 'tweets'), orderBy('date', 'desc'));
    }

    const querySnapshot = await getDocs(tweetsQuery);
    querySnapshot.forEach((tweet) => {
      data.push({ ...tweet.data(), id: tweet.id });
    });

    // fetch user info
    await Promise.all(
      data.map(async (tweet) => {
        let user = await getUserFromRef(tweet.user);
        tweet.user = user;
      })
    );
    setSpinner(false);
    setTweets(data);
    props.setNumOfTweets && props.setNumOfTweets(data.length);
  };

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
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {tweets && tweets.length > 0 ? (
            <section>{displayTweets}</section>
          ) : (
            <section className={styles.tweets}>
              <div className={styles.noTweets}>
                <p className={styles.textLarge}>
                  {props.feed === 'Following' ||
                  props.feed === 'For you' ||
                  props.feed === 'Tweets'
                    ? 'No tweets to show!'
                    : 'Not implemented yet!'}
                </p>
                <p className="textGray">
                  {props.feed === 'Following' || props.feed === 'For you'
                    ? `Tweets will appear here after they've been tweeted.`
                    : `The code for this feature hasn't been written yet.`}
                </p>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};
