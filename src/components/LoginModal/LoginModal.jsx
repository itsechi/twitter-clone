import styles from './LoginModal.module.scss';
import icons from '../../assets/icons.svg';

export const LoginModal = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={() => props.setModal(false)}
      ></div>
      <div className={styles.loginModal}>
        <div className={styles.closeBtn} onClick={() => props.setModal(false)}>
          <svg>
            <use href={`${icons}#close`}></use>
          </svg>
        </div>
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
