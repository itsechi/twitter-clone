import styles from './Tweet.module.scss';
import icons from '../../assets/icons.svg';
import format from 'date-fns/format';
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../helpers/firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { Icon } from '../Icon/Icon';

export const Tweet = (props) => {
  const [liked, setLiked] = React.useState(false);
  const [amountOfLikes, setAmountOfLikes] = React.useState();
  const date = new Date(props.data.date.seconds * 1000);
  const formattedDate = format(date, 'MMM d');

  React.useEffect(() => {
    props.loggedUser &&
    props.data.likes.some((user) => user.id === props.loggedUser.username)
      ? setLiked(true)
      : setLiked(false);
    setAmountOfLikes(props.data.likes.length);
  }, [props.data]);

  const updateLikes = async () => {
    if (!props.loggedUser) return;
    try {
      await updateDoc(doc(db, 'tweets', props.data.id), {
        likes: liked
          ? arrayRemove(doc(db, `/profiles/${props.loggedUser.username}`))
          : arrayUnion(doc(db, `/profiles/${props.loggedUser.username}`)),
      });
      setLiked(!liked);
      onSnapshot(doc(db, 'tweets', props.data.id), (doc) => {
        setAmountOfLikes(doc.data().likes.length);
      });
    } catch (error) {
      console.error('Error updating likes in Firebase Database', error);
    }
  };

  return (
    <article className={styles.tweet}>
      <Link to={`/${props.data.user.username}`}>
        <img className="profilePic" src={props.data.user.profilePicture}></img>
      </Link>
      <div className={styles.tweetContent}>
        <div>
          <Link
            to={`/${props.data.user.username}`}
            className={[styles.displayName, 'textBold'].join(' ')}
          >
            {props.data.user.displayName}
          </Link>
          <Link to={`/${props.data.user.username}`} className={styles.username}>
            @{props.data.user.username}
          </Link>
          <span className={styles.dot}>·</span>
          <a className={styles.date}>{formattedDate}</a>
        </div>

        <p className={[styles.text, 'textRegular'].join(' ')}>
          {props.data.text}
        </p>

        <div className={styles.icons} onClick={props.openModal} data-id="icons">
          <div className={[styles.chat, styles.icon].join(' ')}>
            <Icon name="chat" />
          </div>

          <div className={[styles.retweet, styles.icon].join(' ')}>
            <Icon name="retweet" />
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
              <Icon name={liked ? 'liked' : 'like'} />
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
