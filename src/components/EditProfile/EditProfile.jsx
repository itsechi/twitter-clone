import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import { InputWrap } from './InputWrap';

export const EditProfile = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={() => props.setEditModal(false)}
      ></div>

      <div className={styles.editModal}>
        <div className={styles.header}>
          <div
            className={styles.closeBtn}
            onClick={() => props.setEditModal(false)}
          >
            <svg>
              <use href={`${icons}#close`}></use>
            </svg>
          </div>

          <h2 className={styles.headerTitle}>Edit profile</h2>
          <button className={['btn', styles.btn].join(' ')}>Save</button>
        </div>

        <div className={styles.inputs}>
          <InputWrap text={'Name'} input={props.loggedUser.displayName} />
          <InputWrap text={'Bio'} input={props.loggedUser.description} />
        </div>
      </div>
    </div>
  );
};
