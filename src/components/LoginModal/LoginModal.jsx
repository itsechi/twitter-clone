import styles from './LoginModal.module.scss';
import { Icon } from '../Icon/Icon';
import { Modal } from '../Modal/Modal';
import { CloseBtn } from '../CloseBtn/CloseBtn';
import { Button } from '../Button/Button';

export const LoginModal = (props) => {
  const modal = (
    <div className={styles.loginModal}>
      <CloseBtn setModal={props.setModal} />

      <Icon name="twitter" styles={styles.twitterIcon} />

      <div className={styles.text}>
        <h2 className={styles.textLarge}>Don’t miss what’s happening</h2>
        <p>People on Twitter are the first to know.</p>
      </div>

      <Button
        styles={['loginBtn']}
        clickEvent={props.signInWithGoogle}
        text={'Log in'}
      />
      <Button
        styles={['loginBtn']}
        clickEvent={props.joinAsGuest}
        text={'Join as guest'}
      />
    </div>
  );

  return <Modal setModal={props.setModal} modal={modal} />;
};
