import styles from './Home.module.scss';
import React from 'react';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');

  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Home</h2>
      <Nav feed={feed} setFeed={setFeed} ids={['For you', 'Following']} />
      <Tweets openModal={props.openModal} />
    </main>
  );
};
