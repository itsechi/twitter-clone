import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';
import { getUserFromQuery } from '../../helpers/getUserFromQuery';

// react
import React from 'react';
import { useParams, Link } from 'react-router-dom';

// firebase
import { db } from '../../helpers/firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';

export const Profile = (props) => {
  const routeParams = useParams();
  const [feed, setFeed] = React.useState('Tweets');
  const [user, setUser] = React.useState();
  const [tweets, setTweets] = React.useState();
  const [followerAmount, setFollowerAmount] = React.useState();
  const [followed, setFollowed] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    getUser(routeParams.id);
  }, [routeParams.id, props.loggedUser]);

  const getUser = async (username) => {
    const user = await getUserFromQuery(username);
    if (!user) return;
    setUser(user.data());
    setFollowerAmount(user.data().followers.length);

    // update the button
    const followStatus = user
      .data()
      .followers.some(
        (user) => props.loggedUser && user.id === props.loggedUser.username
      );
    setFollowed(followStatus);
    !followStatus ? setButtonText('Follow') : setButtonText('Following');
  };

  const updateFollowing = async () => {
    try {
      // update the follower count of the account the logged user has followed
      await updateDoc(doc(db, 'profiles', routeParams.id), {
        followers: followed
          ? arrayRemove(doc(db, `/profiles/${props.loggedUser.username}`))
          : arrayUnion(doc(db, `/profiles/${props.loggedUser.username}`)),
      });
      // update the following count of the logged user
      await updateDoc(doc(db, 'profiles', props.loggedUser.username), {
        following: followed
          ? arrayRemove(doc(db, `/profiles/${routeParams.id}`))
          : arrayUnion(doc(db, `/profiles/${routeParams.id}`)),
      });
      onSnapshot(doc(db, 'profiles', routeParams.id), (doc) => {
        setFollowerAmount(doc.data().followers.length);
      });

      // update the button
      if (followed) {
        setFollowed(false);
        setButtonText('Follow');
      } else {
        setFollowed(true);
        setButtonText('Following');
      }
    } catch (error) {
      console.error('Error saving follower data to Firebase Database', error);
    }
  };

  const numberOfTweets = tweets
    ? `${tweets} ${tweets === 1 ? 'Tweet' : 'Tweets'}`
    : '0 Tweets';

  return (
    <main className="main">
      {user && (
        <>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <svg>
                <use href={`${icons}#back`}></use>
              </svg>
            </div>
            <div className={styles.headerText}>
              <h2 className={[styles.headerTextLarge, "textLarge"].join(' ')}>{user.displayName}</h2>
              <p>{numberOfTweets}</p>
            </div>
          </div>

          <div className={styles.images}>
            <img
              className={styles.banner}
              src={
                user.bannerPicture
                  ? user.bannerPicture
                  : 'https://pbs.twimg.com/profile_banners/1256344213664530433/1603029972/600x200'
              }
            ></img>
            <img className={styles.profilePic} src={user.profilePicture}></img>
          </div>

          <div className={styles.info}>
            <div className={styles.followBar}>
              {props.loggedUser &&
                props.loggedUser.username !== routeParams.id && (
                  <button
                    className={[
                      followed ? styles.unfollowBtn : styles.followBtn,
                      styles.btn,
                      "btn"
                    ].join(' ')}
                    onClick={updateFollowing}
                    onMouseOver={() => followed && setButtonText('Unfollow')}
                    onMouseLeave={() => followed && setButtonText('Following')}
                  >
                    {buttonText}
                  </button>
                )}
            </div>

            <h2 className="textLarge">{user.displayName}</h2>
            <p className="textGray">@{user.username}</p>
            <p className={[styles.description, "textRegular"].join(' ')}>{user.description}</p>

            <div className={styles.followerCount}>
              <Link to={`./following`}>
                <p className={styles.countText}>
                  <span className="textBold">{user.following.length}</span>{' '}
                  Following
                </p>
              </Link>
              <Link to={`./followers`}>
                <p>
                  <span className="textBold">{followerAmount}</span>{' '}
                  Followers
                </p>
              </Link>
            </div>
          </div>

          <Nav
            feed={feed}
            setFeed={setFeed}
            ids={['Tweets', 'Replies', 'Media', 'Likes']}
          />

          <Tweets
            openModal={props.openModal}
            author={user.username}
            loggedUser={props.loggedUser}
            setTweets={setTweets}
          />
        </>
      )}
    </main>
  );
};
