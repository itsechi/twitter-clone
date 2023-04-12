import styles from './LoginModal.module.scss';

export const LoginModal = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.loginModal}>
        <div className={styles.text}>
          <h2 className={styles.textLarge}>Don’t miss what’s happening</h2>
          <p>People on Twitter are the first to know.</p>
        </div>
        <a href="#" className={styles.btn} onClick={props.signInWithGoogle}>
          Log in
        </a>
      </div>
    </div>
  );
};
