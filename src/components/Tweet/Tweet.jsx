import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import format from 'date-fns/format';

export const Tweet = (props) => {
  const { data } = props;
  const [liked, setLiked] = React.useState(data.liked);
  const date = new Date(data.date.seconds * 1000);
  const formattedDate = format(date, 'MMM d');

  return (
    <article className={styles.tweet}>
      <img className={styles.profilePic} src={data.user.profilePicture}></img>
      <div className={styles.tweetContent}>
        <div>
          <a className={styles.displayName}>{data.user.displayName}</a>
          <a className={styles.username}>@{data.user.username}</a>
          <span className={styles.dot}>·</span>
          <a className={styles.date}>{formattedDate}</a>
        </div>
        <p className={styles.text}>{data.text}</p>
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
            onClick={() => props.user && setLiked(!liked)}
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
