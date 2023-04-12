import styles from './BottomBar.module.scss';

export const BottomBar = (props) => {
  return (
    <footer className={styles.bottomBar}>
      <div className={styles.text}>
        <span className={styles.textLarge}>Don’t miss what’s happening</span>
        <span>People on Twitter are the first to know.</span>
      </div>
      <a href="#" className={styles.btn} onClick={props.signInWithGoogle}>
        Log in
      </a>
    </footer>
  );
};
