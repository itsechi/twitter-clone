import styles from './GoBackBar.module.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const GoBackBar = (props) => {
  return (
    <div className={[styles.header, 'header'].join(' ')}>
      <Link to={props.link} className={styles.headerIcon}>
        <Icon name="back" />
      </Link>
      <div className={styles.headerText}>
        <h2 className={[styles.headerTextLarge, 'textLarge'].join(' ')}>
          {props.displayName}
        </h2>
        <p>{props.info}</p>
      </div>
    </div>
  );
};
