import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';

export const Tweet = (props) => {
  const [liked, setLiked] = React.useState(props.liked);

  return (
    <article className={styles.tweet}>
      <img className={styles.profilePic} src={props.profilePicture}></img>
      <div className={styles.tweetContent}>
        <div>
          <a className={styles.displayName}>{props.displayName}</a>
          <a className={styles.username}>@{props.username}</a>
          <span className={styles.dot}>·</span>
          <a className={styles.date}>{props.date}</a>
        </div>
        <p className={styles.text}>{props.text}</p>
        <div className={styles.icons} onClick={props.openModal} data-id="icons">
          <div className={[styles.chat, styles.icon].join(' ')}>
            <svg>
              <use href={`${icons}#chat`}></use>
            </svg>
          </div>

          <div className={[styles.retweet, styles.icon].join(' ')}>
            <svg>
              <use href={`${icons}#retweet`}></use>
            </svg>
          </div>

          <div
            className={[
              styles.like,
              styles.icon,
              liked ? styles.liked : '',
            ].join(' ')}
            onClick={() => setLiked(!liked)}
          >
            <svg>
              <use href={liked ? `${icons}#liked` : `${icons}#like`}></use>
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};
