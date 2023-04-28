import { NavLink } from './NavLink';
import styles from './Nav.module.scss';

export const Nav = (props) => {
  console.log(props.links);

  const navLinks = props.ids.map((id, i) => (
    <NavLink
      link={props.links && props.links[i]}
      key={i}
      id={id}
      feed={props.feed}
      setFeed={props.setFeed}
    />
  ));

  return <nav className={styles.nav}>{navLinks}</nav>;
};
