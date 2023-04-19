import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';
import React from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../helpers/firebase';

export const Profile = (props) => {
  const routeParams = useParams();
  const [feed, setFeed] = React.useState('Tweets');
  const [user, setUser] = React.useState();

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

  React.useEffect(() => {
    getUser(routeParams.id);
  }, []);

  return (
    <>
      {user && (
        <main className={styles.profile}>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <svg>
                <use href={`${icons}#back`}></use>
              </svg>
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.headerTextLarge}>{user.displayName}</h2>
              <p>0 Tweets</p>
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
              <button className={styles.followBtn}>Follow</button>
            </div>

            <h2 className={styles.displayName}>{user.displayName}</h2>
            <p className={styles.username}>@{user.username}</p>
            <p className={styles.description}>{user.description}</p>
          </div>

          <Nav
            feed={feed}
            setFeed={setFeed}
            ids={['Tweets', 'Replies', 'Media', 'Likes']}
          />

          <Tweets openModal={props.openModal} user={user.username} />
        </main>
      )}
    </>
  );
};
