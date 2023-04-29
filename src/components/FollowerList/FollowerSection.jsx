import { Link } from 'react-router-dom';
import styles from './FollowerList.module.scss';

export const followerSection = (feed) => {
  return feed.map((data) => {
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
};
