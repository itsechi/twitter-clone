import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import { InputWrap } from './InputWrap';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../helpers/firebase';
import React from 'react';

export const EditProfile = (props) => {
  const [displayName, setDisplayName] = React.useState(props.loggedUser.displayName || '')
  const [description, setDescription] = React.useState(props.loggedUser.description || '')

  const updateProfile = async () => {
    try {
      await updateDoc(doc(db, 'profiles', props.loggedUser.username), {
        displayName: displayName,
        description: description
      });
      props.setEditModal(false)
    } catch (error) {
      console.error('Error updating profile in Firebase Database', error);
    }
  };

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
          <button onClick={updateProfile} className={['btn', styles.btn].join(' ')}>Save</button>
        </div>

        <div className={styles.inputs}>
          <InputWrap text={'Name'} input={displayName} setInput={setDisplayName} />
          <InputWrap text={'Bio'} input={description} setInput={setDescription} />
        </div>
      </div>
    </div>
  );
};
