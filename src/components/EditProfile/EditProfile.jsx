import { InputWrap } from './InputWrap';
import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';
import AvatarEditor from 'react-avatar-editor';

// firebase
import { db, storage } from '../../helpers/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const EditProfile = (props) => {
  const [displayName, setDisplayName] = React.useState(
    props.loggedUser.displayName || ''
  );
  const [description, setDescription] = React.useState(
    props.loggedUser.description || ''
  );
  const [profilePicture, setProfilePicture] = React.useState(
    props.loggedUser.profilePicture || ''
  );
  const [croppedPicture, setCroppedPicture] = React.useState({
    cropperOpen: false,
    originalImg: null,
    zoom: 2,
    croppedImg: '',
  });

  const editor = React.useRef(null);

  const updateProfile = async () => {
    try {
      await updateDoc(doc(db, 'profiles', props.loggedUser.username), {
        displayName: displayName,
        description: description,
      });
      props.setEditModal(false);
    } catch (error) {
      console.error('Error updating profile in Firebase Database', error);
    }
    props.setUpdated(true);
  };

  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);

    setCroppedPicture({
      ...croppedPicture,
      originalImg: url,
      cropperOpen: true,
    });
  };

  const handleSave = () => {
    const canvasScaled = editor.current.getImageScaledToCanvas();
    const croppedImg = canvasScaled.toDataURL();

    canvasScaled.toBlob((blob) => {
      const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
      uploadBytes(storageRef, blob);
    });

    setCroppedPicture({
      ...croppedPicture,
      originalImg: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });

    getProfilePicture();
  };

  const getProfilePicture = () => {
    const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
    getDownloadURL(storageRef)
      .then((url) => {
        setProfilePicture(url);
      })
      .catch((error) => {
        console.error(error);
      });
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
          {!croppedPicture.cropperOpen ? (
            <button
              onClick={updateProfile}
              className={['btn', styles.btn].join(' ')}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleSave}
              className={['btn', styles.btn].join(' ')}
            >
              Apply
            </button>
          )}
        </div>

        {croppedPicture.cropperOpen && (
          <div className={styles.cropper}>
            <AvatarEditor
              image={croppedPicture.originalImg}
              className={styles.crop}
              width={336}
              height={336}
              border={50}
              color={[230, 236, 240, 0.7]}
              scale={1}
              rotate={0}
              ref={editor}
            />
          </div>
        )}

        {!croppedPicture.cropperOpen && (
          <>
            <div className={styles.images}>
              <img
                className={styles.banner}
                src={
                  props.loggedUser.bannerPicture
                    ? props.loggedUser.bannerPicture
                    : 'https://pbs.twimg.com/profile_banners/1256344213664530433/1603029972/600x200'
                }
              ></img>

              <div className={styles.profilePicContainer}>
                {croppedPicture.croppedImg ? (
                  <img
                    className={styles.profilePic}
                    src={croppedPicture.croppedImg}
                  ></img>
                ) : (
                  <img className={styles.profilePic} src={profilePicture}></img>
                )}
                <label className={styles.pictureInput}>
                  <svg>
                    <use href={`${icons}#pictureInput`}></use>
                  </svg>
                  <input
                    className={styles.hidden}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  ></input>
                </label>
              </div>
            </div>

            <div className={styles.inputs}>
              <InputWrap
                text={'Name'}
                input={displayName}
                setInput={setDisplayName}
              />
              <InputWrap
                text={'Bio'}
                input={description}
                setInput={setDescription}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
