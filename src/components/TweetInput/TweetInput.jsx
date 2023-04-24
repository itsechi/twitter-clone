import styles from './TweetInput.module.scss';
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../helpers/firebase';
import React from 'react';

export const TweetInput = (props) => {
  const [tweet, setTweet] = React.useState('');

  const sendTweet = async (input) => {
    const username = props.user.email.split('@')[0];
    const data = {
      text: input,
      username: username,
      likes: [],
      user: doc(db, `/profiles/${username}`),
      date: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, 'tweets'), data);
      props.getTweets();
    } catch (error) {
      console.error('Error saving tweet to Firebase Database', error);
    }
  };

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  return (
    <div className={styles.tweet}>
      <img className={styles.profilePic} src={props.user.photoURL}></img>
      <div className={styles.tweetInput}>
        <input
          className={styles.input}
          placeholder="What's happening?"
          type="text"
          value={tweet}
          onChange={handleChange}
        ></input>
        <button className={styles.btn} onClick={() => sendTweet(tweet)}>
          Tweet
        </button>
      </div>
    </div>
  );
};
