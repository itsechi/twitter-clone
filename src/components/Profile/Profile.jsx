import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';
import React from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
  const [followed, setFollowed] = React.useState();
  const [followerAmount, setFollowerAmount] = React.useState();

  const getUser = async (username) => {
    const userQuery = query(
      collection(db, 'profiles'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(userQuery);
    const user = querySnapshot.docs[0];
    if (!user) return;
    setUser(user.data());
  };

  const updateFollowing = async () => {
    if (!props.loggedUser) return;
    try {
      await updateDoc(doc(db, 'profiles', routeParams.id), {
        followers: arrayUnion(
          doc(db, `/profiles/${props.loggedUser.username}`)
        ),
      });
      onSnapshot(doc(db, 'profiles', routeParams.id), (doc) => {
        setFollowerAmount(doc.data().followers.length);
      });
    } catch (error) {
      console.error('Error saving user data fo Firebase Database', error);
    }
  };

  React.useEffect(() => {
    getUser(routeParams.id);
    user && setFollowerAmount(user.followers.length);
  }, [routeParams]);

  const numberOfTweets = tweets
    ? `${tweets} ${tweets === 1 ? 'Tweet' : 'Tweets'}`
    : '0 Tweets';

  return (
    <main className={styles.profile}>
      {user && (
        <>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <svg>
                <use href={`${icons}#back`}></use>
              </svg>
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.headerTextLarge}>{user.displayName}</h2>
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
              <button className={styles.followBtn} onClick={updateFollowing}>
                Follow
              </button>
            </div>

            <h2 className={styles.displayName}>{user.displayName}</h2>
            <p className={styles.username}>@{user.username}</p>
            <p className={styles.description}>{user.description}</p>

            <div className={styles.followerCount}>
              <p className={styles.countText}>
                <span className={styles.count}>
                  {user.following && user.following.length}
                </span>{' '}
                Following
              </p>
              <p>
                <span className={styles.count}>
                  {user.followers && followerAmount}
                </span>{' '}
                Followers
              </p>
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
            user={props.user}
            setTweets={setTweets}
          />
        </>
      )}
    </main>
  );
};
