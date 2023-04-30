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
  const [amountOfLikes, setAmountOfLikes] = React.useState();
  const date = new Date(data.date.seconds * 1000);
  const formattedDate = format(date, 'MMM d');

  const updateLikes = async () => {
    if (!props.loggedUser) return;
    try {
      await updateDoc(doc(db, 'tweets', data.id), {
        likes: liked
          ? arrayRemove(doc(db, `/profiles/${props.loggedUser.username}`))
          : arrayUnion(doc(db, `/profiles/${props.loggedUser.username}`)),
      });
      setLiked(!liked);
      onSnapshot(doc(db, 'tweets', data.id), (doc) => {
        setAmountOfLikes(doc.data().likes.length);
      });
    } catch (error) {
      console.error('Error updating likes in Firebase Database', error);
    }
  };

  React.useEffect(() => {
    props.loggedUser &&
      data.likes.some((user) => user.id === props.loggedUser.username) ?
      setLiked(true) : setLiked(false);
    setAmountOfLikes(data.likes.length);
  }, [data]);

  return (
    <article className={styles.tweet}>
      <Link to={`/${data.user.username}`}>
        <img className="profilePic" src={data.user.profilePicture}></img>
      </Link>
      <div className={styles.tweetContent}>
        <div>
          <Link to={`/${data.user.username}`} className={[styles.displayName, "textBold"].join(' ')}>
            {data.user.displayName}
          </Link>
          <Link to={`/${data.user.username}`} className={styles.username}>
            @{data.user.username}
          </Link>
          <span className={styles.dot}>·</span>
          <a className={styles.date}>{formattedDate}</a>
        </div>
        <p className={[styles.text, "textRegular"].join(' ')}>{data.text}</p>
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
