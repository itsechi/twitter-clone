import styles from './FollowerList.module.scss';
import { Nav } from '../Nav/Nav';
import { getUserFromRef } from '../../helpers/getUserFromRef';
import { getUserFromQuery } from '../../helpers/getUserFromQuery';

// react
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

export const FollowerList = () => {
  const [feed, setFeed] = React.useState('');
  const [following, setFollowing] = React.useState();
  const [followers, setFollowers] = React.useState();
  const routeParams = useParams();
  const location = useLocation();

  React.useEffect(() => {
    getFollowerList(routeParams.id);
    location.pathname.includes('following')
      ? setFeed('Following')
      : setFeed('Followers');
  }, []);

  const getFollowerList = async (username) => {
    const user = await getUserFromQuery(username);
    if (!user) return;
    let following = [];
    let followers = [];

    await Promise.all(
      user.data().following.map(async (data) => {
        let user = await getUserFromRef(data);
        following.push(user);
      }),
      user.data().followers.map(async (data) => {
        let user = await getUserFromRef(data);
        followers.push(user);
      })
    );
    setFollowing(following);
    setFollowers(followers);
  };

  const followingSection =
    following &&
    following.map((data) => {
      return (
        <Link to={`/${data.username}`} key={data.username}>
          <div className={styles.account}>
            <img
              className={styles.profilePicture}
              src={data.profilePicture}
            ></img>
            <div className={styles.info}>
              <p className={styles.displayName}>{data.displayName}</p>
              <p className={styles.username}>@{data.username}</p>
              <p>{data.description}</p>
            </div>
          </div>
        </Link>
      );
    });

  const followersSection =
    followers &&
    followers.map((data) => {
      return (
        <Link to={`/${data.username}`} key={data.username}>
          <div className={styles.account}>
            <img
              className={styles.profilePicture}
              src={data.profilePicture}
            ></img>
            <div className={styles.info}>
              <p className={styles.displayName}>{data.displayName}</p>
              <p className={styles.username}>@{data.username}</p>
              <p>{data.description}</p>
            </div>
          </div>
        </Link>
      );
    });

  return (
    <main className={styles.followerList}>
      <Nav
        feed={feed}
        setFeed={setFeed}
        links={[`/${routeParams.id}/followers`, `/${routeParams.id}/following`]}
        ids={['Followers', 'Following']}
      />
      {following && feed === 'Following' && followingSection}
      {followers && feed === 'Followers' && followersSection}
    </main>
  );
};
