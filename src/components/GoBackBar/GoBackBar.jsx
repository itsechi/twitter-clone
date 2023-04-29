import styles from './GoBackBar.module.scss';
import icons from '../../assets/icons.svg';

export const GoBackBar = (props) => {
  return (
    <div className={[styles.header, "header"].join(' ')}>
      <div className={styles.headerIcon}>
        <svg>
          <use href={`${icons}#back`}></use>
        </svg>
      </div>
      <div className={styles.headerText}>
        <h2 className={[styles.headerTextLarge, 'textLarge'].join(' ')}>
          {props.displayName}
        </h2>
        <p>{props.info}</p>
      </div>
    </div>
  );
};
