import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import { Tweets } from '../Tweets/Tweets';

export const Profile = (props) => {
  const routeParams = useParams();
  const { user } = props;
  const username = user.email.split('@')[0];
  const [feed, setFeed] = React.useState('Tweets');

  return (
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
          src="https://pbs.twimg.com/profile_banners/1557764542821765121/1680197453/600x200"
        ></img>
        <img
          className={styles.profilePic}
          src="https://pbs.twimg.com/profile_images/1368996766364831749/yJLY51UF_400x400.jpg"
        ></img>
      </div>

      <div className={styles.info}>
        <div className={styles.followBar}>
          <button className={styles.followBtn}>Follow</button>
        </div>

        <h2 className={styles.displayName}>{user.displayName}</h2>
        <p className={styles.username}>@{username}</p>
        <p className={styles.description}>
          User description here. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptatibus, adipisci.
        </p>
      </div>

      <Nav
        feed={feed}
        setFeed={setFeed}
        ids={['Tweets', 'Replies', 'Media', 'Likes']}
      />

      <Tweets openModal={props.openModal} user={props.user} />
    </main>
  );
};
