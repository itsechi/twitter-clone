import styles from './Home.module.scss';
import React from 'react';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';

export const Home = (props) => {
  const [feed, setFeed] = React.useState('For you');

  React.useEffect(() => {
    document.title = 'Home / Twitter Clone';
  });

  return (
    <main className="main">
      <div className="header">
        <h2 className={styles.title}>Home</h2>
        <Nav feed={feed} setFeed={setFeed} ids={['For you', 'Following']} />
      </div>
      <Tweets
        feed={feed}
        loggedUser={props.loggedUser}
        openModal={props.openModal}
      />
    </main>
  );
};
