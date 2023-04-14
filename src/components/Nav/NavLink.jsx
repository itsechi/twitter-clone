import styles from './Nav.module.scss';

export const NavLink = (props) => {
  return (
    <a
      className={styles.navLink}
      href="#"
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
    </a>
  );
};
