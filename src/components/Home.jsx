import styles from './Home.module.scss';

export const Home = () => {
  return (
    <main className={styles.home}>
      <h2 className={styles.title}>Home</h2>
      <nav className={styles.nav}>
        <a className={styles.navLink} href="#">
          <span className={styles.navText}>
            For you<div className={styles.active}></div>
          </span>
        </a>
        <a href="#">
          {' '}
          <span>
            Following<div></div>
          </span>
        </a>
      </nav>
    </main>
  );
};
