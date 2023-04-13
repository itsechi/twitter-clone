import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import icons from '../../assets/icons.svg';

export const Profile = (props) => {
  const routeParams = useParams();
  const { user } = props;

  return (
    <main className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg>
            <use href={`${icons}#back`}></use>
          </svg>
        </div>

        <div className={styles.headerText}>
          <h2 className={styles.headerTextLarge}>{props.user.displayName}</h2>
          <p>0 Tweets</p>
        </div>
      </div>
      <div className={styles.images}></div>
      <div className={styles.info}></div>
    </main>
  );
};
