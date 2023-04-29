import { Link } from 'react-router-dom';
import styles from './FollowerSection.module.scss';

export const followerSection = (feed) => {
  return feed.map((data) => {
    return (
      <Link
        to={`/${data.username}`}
        key={data.username}
        className={styles.account}
      >
        <img className="profilePic" src={data.profilePicture}></img>
        <div className="textRegular">
          <p className="textBold">{data.displayName}</p>
          <p className="textGray">@{data.username}</p>
          <p className={styles.description}>{data.description}</p>
        </div>
      </Link>
    );
  });
};
