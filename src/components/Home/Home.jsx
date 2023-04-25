import styles from './Home.module.scss';
import React from 'react';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');

  return (
    <main className={styles.home}>
      <div className={styles.header}>
        <h2 className={styles.title}>Home</h2>
        <Nav feed={feed} setFeed={setFeed} ids={['For you', 'Following']} />
      </div>
      <Tweets loggedUser={props.loggedUser} openModal={props.openModal} />
    </main>
  );
};
