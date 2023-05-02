import { Nav } from '../Nav/Nav';
import { GoBackBar } from '../GoBackBar/GoBackBar';
import { getUserFromRef } from '../../helpers/getUserFromRef';
import { getUserFromQuery } from '../../helpers/getUserFromQuery';
import { followerSection } from './FollowerSection';

// react
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export const FollowerList = () => {
  const [feed, setFeed] = React.useState('');
  const [following, setFollowing] = React.useState();
  const [followers, setFollowers] = React.useState();
  const [user, setUser] = React.useState();
  const routeParams = useParams();
  const location = useLocation();

  React.useEffect(() => {
    getFollowerList(routeParams.id);
    location.pathname.includes('following')
      ? setFeed('Following')
      : setFeed('Followers');
  }, [feed]);

  const getFollowerList = async (username) => {
    const user = await getUserFromQuery(username);
    if (!user) return;
    setUser(user.data());
    document.title = `People ${
      feed === 'Following' ? 'followed by' : 'following'
    } ${user.data().displayName} (@${user.data().username}) / Twitter Clone`;
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

  const followingSection = following && followerSection(following);
  const followersSection = followers && followerSection(followers);

  return (
    <main className="main">
      {user && (
        <GoBackBar
          displayName={user.displayName}
          info={`@${user.username}`}
          link={`/${user.username}`}
        />
      )}
      <Nav
        feed={feed}
        setFeed={setFeed}
        links={[`/${routeParams.id}/followers`, `/${routeParams.id}/following`]}
        ids={['Followers', 'Following']}
      />
      <section>
        {feed === 'Following' ? followingSection : followersSection}
      </section>
    </main>
  );
};
