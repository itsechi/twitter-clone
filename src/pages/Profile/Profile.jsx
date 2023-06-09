import styles from './Profile.module.scss';
import { Nav } from '../../components/Nav/Nav';
import { Tweets } from '../../components/Tweets/Tweets';
import { GoBackBar } from '../../components/GoBackBar/GoBackBar';

// react
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

// firebase
import { getUserFromQuery } from '../../helpers/getUserFromQuery';
import { db } from '../../helpers/firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { EditProfile } from '../../components/EditProfile/EditProfile';
import { Button } from '../../components/Button/Button';

export const Profile = (props) => {
  const routeParams = useParams();
  const location = useLocation();
  const [feed, setFeed] = React.useState('Tweets');
  const [user, setUser] = React.useState();
  const [numOfTweets, setNumOfTweets] = React.useState();
  const [followerAmount, setFollowerAmount] = React.useState();
  const [followed, setFollowed] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('');
  const [editModal, setEditModal] = React.useState(false);

  React.useEffect(() => {
    getUser(routeParams.id);
    changeFeedName();
  }, [routeParams.id, props.loggedUser, feed]);

  const changeFeedName = () => {
    const pathname = location.pathname.split('/')[2];
    if (!pathname) return setFeed('Tweets');
    const firstLetter = pathname.charAt(0).toUpperCase();
    const remainingLetters = pathname.slice(1);
    const feedName = firstLetter + remainingLetters;
    setFeed(feedName);
  };

  const getUser = async (username) => {
    const user = await getUserFromQuery(username);
    if (!user) return;
    setUser(user);
    setFollowerAmount(user.followers.length);
    document.title = `${user.displayName} (@${user.username}) / Twitter Clone`;

    // update the button
    const followStatus = user.followers.some(
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

  const numberOfTweets = numOfTweets
    ? `${numOfTweets} ${numOfTweets === 1 ? 'Tweet' : 'Tweets'}`
    : '0 Tweets';

  return (
    <main className="main">
      {user && (
        <>
          <GoBackBar
            displayName={user.displayName}
            info={numberOfTweets}
            link={'/home'}
          />

          <div className={styles.images}>
            <img className={styles.banner} src={user.bannerPicture}></img>
            <img className={styles.profilePic} src={user.profilePicture}></img>
          </div>

          <div className={styles.info}>
            <div className={styles.followBar}>
              {props.loggedUser &&
                (props.loggedUser.username !== routeParams.id ? (
                  <Button
                    styles={[
                      'profileBtn',
                      followed ? 'unfollowBtn' : 'followBtn',
                    ]}
                    clickEvent={updateFollowing}
                    mouseOverEvent={() => followed && setButtonText('Unfollow')}
                    mouseLeaveEvent={() =>
                      followed && setButtonText('Following')
                    }
                    text={buttonText}
                  />
                ) : (
                  <Button
                    styles={['profileBtn', 'editProfileBtn']}
                    clickEvent={() => setEditModal(true)}
                    text="Edit profile"
                  />
                ))}
            </div>

            <h2 className="textLarge">{user.displayName}</h2>
            <p className="textGray">@{user.username}</p>
            <p className={[styles.description, 'textRegular'].join(' ')}>
              {user.description}
            </p>

            <div className={styles.followerCount}>
              <Link to={`/${user.username}/following`}>
                <p className={styles.countText}>
                  <span className="textBold">{user.following.length}</span>{' '}
                  Following
                </p>
              </Link>
              <Link to={`/${user.username}/followers`}>
                <p>
                  <span className="textBold">{followerAmount}</span> Followers
                </p>
              </Link>
            </div>
          </div>

          <Nav
            feed={feed}
            setFeed={setFeed}
            ids={['Tweets', 'Replies', 'Media', 'Likes']}
            links={[
              `/${routeParams.id}`,
              `/${routeParams.id}/replies`,
              `/${routeParams.id}/media`,
              `/${routeParams.id}/likes`,
            ]}
          />

          <Tweets
            feed={feed}
            openModal={props.openModal}
            author={user.username}
            loggedUser={props.loggedUser}
            setNumOfTweets={setNumOfTweets}
          />
        </>
      )}
      {editModal && props.loggedUser && (
        <EditProfile setModal={setEditModal} loggedUser={props.loggedUser} />
      )}
    </main>
  );
};
