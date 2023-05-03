import styles from './BottomBar.module.scss';

export const BottomBar = (props) => {
  return (
    <footer className={styles.bottomBar}>
      <div className={[styles.text, "textRegular"].join(' ')}>
        <span className={styles.text__large}>Don’t miss what’s happening</span>
        <span>People on Twitter are the first to know.</span>
      </div>
      <a href="#" className={[styles.btn, "btn"].join(' ')} onClick={props.openModal}>
        Log in
      </a>
    </footer>
  );
};
