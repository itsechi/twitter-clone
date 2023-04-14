import { NavLink } from './NavLink';
import styles from './Nav.module.scss';

export const Nav = (props) => {
  const navLinks = props.ids.map((id) => (
    <NavLink id={id} feed={props.feed} setFeed={props.setFeed} />
  ));

  return <nav className={styles.nav}>{navLinks}</nav>;
};
