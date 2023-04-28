import styles from './Nav.module.scss';
import { Link } from 'react-router-dom';

export const NavLink = (props) => {
  return (
    <Link
      to={props.link}
      className={styles.navLink}
      onClick={() => props.setFeed(props.id)}
    >
      <span
        className={[
          styles.navText,
          props.feed === props.id ? styles.navTextActive : '',
        ].join(' ')}
      >
        {props.id}
        <div className={props.feed === props.id ? styles.active : ''}></div>
      </span>
    </Link>
  );
};
