import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../helpers/firebase';

export const Tweet = (props) => {
  const { data } = props;
  const [liked, setLiked] = React.useState(false);
  const date = new Date(data.date.seconds * 1000);
  const formattedDate = format(date, 'MMM d');
  const [amountOfLikes, setAmountOfLikes] = React.useState();

  const updateLikes = async () => {
    if (!props.loggedUser) return;
    setLiked(!liked);
    try {
      await updateDoc(doc(db, 'tweets', data.id), {
        likes: liked
          ? arrayRemove(doc(db, `/profiles/${props.loggedUser.username}`))
          : arrayUnion(doc(db, `/profiles/${props.loggedUser.username}`)),
      });
      onSnapshot(doc(db, 'tweets', data.id), (doc) => {
        setAmountOfLikes(doc.data().likes.length);
      });
    } catch (error) {
      console.error('Error saving user data fo Firebase Database', error);
    }
  };

  React.useEffect(() => {
    props.loggedUser && data.likes.some((item) => item.id === props.loggedUser.username) &&
      setLiked(true);
    setAmountOfLikes(data.likes.length);
  }, [data]);

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

          <div className={styles.iconContainer}>
            <div
              className={[
                styles.like,
                styles.icon,
                liked ? styles.liked : '',
              ].join(' ')}
              onClick={() => updateLikes()}
            >
              <svg>
                <use href={liked ? `${icons}#liked` : `${icons}#like`}></use>
              </svg>
            </div>
            <span className={styles.number}>
              {amountOfLikes === 0 ? '' : amountOfLikes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
