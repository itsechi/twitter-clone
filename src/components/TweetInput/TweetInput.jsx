import styles from './TweetInput.module.scss';
import React from 'react';
import { Button } from '../Button/Button';
import { db } from '../../helpers/firebase';
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';

export const TweetInput = (props) => {
  const [tweet, setTweet] = React.useState('');
  const textAreaRef = React.useRef();

  React.useEffect(() => {
    resizeTextArea();
  }, [tweet]);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  };

  const sendTweet = async (input) => {
    const data = {
      text: input,
      username: props.loggedUser.username,
      likes: [],
      user: doc(db, `/profiles/${props.loggedUser.username}`),
      date: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, 'tweets'), data);
      props.getTweets();
      setTweet('');
    } catch (error) {
      console.error('Error saving tweet to Firebase Database', error);
    }
  };

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  const buttonDisabled =
    tweet.length === 0 ? true : tweet.length > 280 ? true : false;

  const tweetLength =
    tweet.length === 280
      ? '0'
      : tweet.length > 280
      ? `-${tweet.length - 280}`
      : tweet.length >= 260
      ? 280 - tweet.length
      : '';

  const progressColor =
    tweet.length < 260
      ? '#1D9BF0'
      : tweet.length >= 280
      ? '#F4212E'
      : '#FFD400';

  return (
    <div className={styles.tweet}>
      <img className="profilePic" src={props.loggedUser.profilePicture}></img>
      <div className={styles.tweetInput}>
        <textarea
          className={styles.input}
          placeholder="What's happening?"
          type="text"
          value={tweet}
          onChange={handleChange}
          ref={textAreaRef}
        ></textarea>

        <div className={styles.bottom}>
          <div className={styles.tweetLength}>
            <p
              className={[
                styles.length,
                tweet.length < 280 ? styles.lengthGray : styles.lengthRed,
              ].join(' ')}
            >
              {tweetLength}
            </p>
            {tweet.length < 290 && (
              <svg
                className={styles.progressCircle}
                width="100%"
                height="100%"
                viewBox="0 0 30 30"
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="20"
                  fill="none"
                  stroke="#EFF3F4"
                  strokeWidth="3"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="20"
                  fill="none"
                  stroke={progressColor}
                  strokeWidth="3"
                  pathLength="100"
                  strokeDashoffset={
                    tweet.length <= 280
                      ? `calc(100 - (100 * ${tweet.length} / 280))`
                      : '0'
                  }
                  strokeDasharray="100"
                />
              </svg>
            )}
          </div>

          <Button
            disabled={buttonDisabled}
            styles={['tweetInputBtn']}
            clickEvent={() => sendTweet(tweet)}
            text={'Tweet'}
          />
        </div>
      </div>
    </div>
  );
};
