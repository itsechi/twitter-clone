import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

export const Tweet = (props) => {
  const { data } = props;
  const [liked, setLiked] = React.useState(data.liked);
  const date = new Date(data.date.seconds * 1000);
  const formattedDate = format(date, 'MMM d');

  return (
    <article className={styles.tweet}>
      <Link to={`/${data.user.username}`}>
        <img className={styles.profilePic} src={data.user.profilePicture}></img>
      </Link>
      <div className={styles.tweetContent}>
        <div>
          <Link to={`/${data.user.username}`} className={styles.displayName}>
            {data.user.displayName}
          </Link>
          <Link to={`/${data.user.username}`} className={styles.username}>
            @{data.user.username}
          </Link>
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
