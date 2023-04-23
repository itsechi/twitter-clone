import styles from './TweetInput.module.scss';

export const TweetInput = (props) => {
  return (
    <div className={styles.tweet}>
      <img className={styles.profilePic} src={props.profilePic}></img>
      <div className={styles.tweetInput}>
        <input
          className={styles.input}
          placeholder="What's happening?"
          type="text"
        ></input>
        <button className={styles.btn}>Tweet</button>
      </div>
    </div>
  );
};
