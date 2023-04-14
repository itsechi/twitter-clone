import { NavLink } from './NavLink';
import styles from './Nav.module.scss';

export const Nav = (props) => {
  return (
    <nav className={styles.nav}>
      <NavLink id={'For you'} feed={props.feed} setFeed={props.setFeed} />
      <NavLink id={'Following'} feed={props.feed} setFeed={props.setFeed} />
    </nav>
  );
};
