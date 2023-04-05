import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';

export const Tweet = () => {
  const [liked, setLiked] = React.useState(false);

  return (
    <article className={styles.tweet}>
      <div>
        <a className={styles.displayName}>Name</a>
        <a className={styles.username}>@username</a>
        <span className={styles.dot}>·</span>
        <a className={styles.date}>Mar 26</a>
      </div>
      <p className={styles.text}>
        The content of the tweet here. Random words blah blah. Long tweet with a
        lot characters. Even some more words to check for the word-breaking.
        Lorem impsum blah blah.
      </p>
      <div className={styles.icons}>
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

        <div className={[styles.like, styles.icon, liked ? styles.liked : ''].join(' ')} onClick={() => setLiked(!liked)}>
          <svg>
            <use href={liked ? `${icons}#liked` : `${icons}#like`}></use>
          </svg>
        </div>
      </div>
    </article>
  );
};
