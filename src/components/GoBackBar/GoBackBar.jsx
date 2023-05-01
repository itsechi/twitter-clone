import styles from './GoBackBar.module.scss';
import icons from '../../assets/icons.svg';
import { Link } from 'react-router-dom';

export const GoBackBar = (props) => {
  return (
    <div className={[styles.header, "header"].join(' ')}>
      <Link to={props.link} className={styles.headerIcon}>
        <svg>
          <use href={`${icons}#back`}></use>
        </svg>
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
