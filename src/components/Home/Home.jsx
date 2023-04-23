import styles from './Home.module.scss';
import React from 'react';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';
import { TweetInput } from '../TweetInput/TweetInput';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');

  return (
    <main className={styles.home}>
      <div className={styles.header}>
        <h2 className={styles.title}>Home</h2>
        <Nav feed={feed} setFeed={setFeed} ids={['For you', 'Following']} />
      </div>
      {props.user && <TweetInput profilePic={props.user.photoURL} />}
      <Tweets user={props.user} openModal={props.openModal} />
    </main>
  );
};
