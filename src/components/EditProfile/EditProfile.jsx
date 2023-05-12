import { InputWrap } from './InputWrap';
import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';

// firebase
import { db, storage } from '../../helpers/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageCropper } from './ImageCropper';

export const EditProfile = (props) => {
  const editor = React.useRef(null);
  const [displayName, setDisplayName] = React.useState(
    props.loggedUser.displayName || ''
  );
  const [description, setDescription] = React.useState(
    props.loggedUser.description || ''
  );
  const [profilePicture, setProfilePicture] = React.useState(
    props.loggedUser.profilePicture || ''
  );
  const [bannerPicture, setBannerPicture] = React.useState(
    props.loggedUser.bannerPicture || ''
  );
  const [croppedPicture, setCroppedPicture] = React.useState({
    cropperOpen: false,
    originalImg: null,
    zoom: 2,
    croppedImg: '',
  });
  const [croppedBanner, setCroppedBanner] = React.useState({
    cropperOpen: false,
    originalImg: null,
    zoom: 2,
    croppedImg: '',
  });

  const handleFileChange = (e, type) => {
    let url = URL.createObjectURL(e.target.files[0]);

    if (type === 'profile') {
      setCroppedPicture({
        ...croppedPicture,
        originalImg: url,
        cropperOpen: true,
      });
    } else {
      setCroppedBanner({
        ...croppedBanner,
        originalImg: url,
        cropperOpen: true,
      });
    }
  };

  const handleSave = (type) => {
    const canvasScaled = editor.current.getImageScaledToCanvas();
    const croppedImg = canvasScaled.toDataURL();

    canvasScaled.toBlob((blob) => {
      const storageRef =
        type === 'profile'
          ? ref(storage, `${props.loggedUser.username}.jpg`)
          : ref(storage, `${props.loggedUser.username}_banner.jpg`);
      uploadBytes(storageRef, blob);
    });

    type === 'profile'
      ? setCroppedPicture({
          ...croppedPicture,
          originalImg: null,
          cropperOpen: false,
          croppedImg: croppedImg,
        })
      : setCroppedBanner({
          ...croppedBanner,
          originalImg: null,
          cropperOpen: false,
          croppedImg: croppedImg,
        });

    getPicture(type);
  };

  const getPicture = (type) => {
    const storageRef =
      type === 'profile'
        ? ref(storage, `${props.loggedUser.username}.jpg`)
        : ref(storage, `${props.loggedUser.username}_banner.jpg`);
    getDownloadURL(storageRef)
      .then((url) => {
        type === 'profile' ? setProfilePicture(url) : setBannerPicture(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateProfile = async () => {
    try {
      await updateDoc(doc(db, 'profiles', props.loggedUser.username), {
        displayName: displayName,
        description: description,
        profilePicture: profilePicture,
        bannerPicture: bannerPicture,
      });
      props.setEditModal(false);
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

          <h2 className={styles.headerTitle}>
            {!croppedPicture.cropperOpen || !croppedBanner.cropperOpen
              ? 'Edit profile'
              : 'Edit media'}
          </h2>
          {!croppedPicture.cropperOpen && !croppedBanner.cropperOpen ? (
            <button
              onClick={updateProfile}
              className={['btn', styles.btn].join(' ')}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() =>
                croppedPicture.cropperOpen
                  ? handleSave('profile')
                  : handleSave('banner')
              }
              className={['btn', styles.btn].join(' ')}
            >
              Apply
            </button>
          )}
        </div>

        {croppedPicture.cropperOpen || croppedBanner.cropperOpen ? (
          <ImageCropper
            editor={editor}
            width={croppedPicture.cropperOpen ? 336 : 550}
            height={croppedPicture.cropperOpen ? 336 : 180}
            originalImg={
              croppedPicture.cropperOpen
                ? croppedPicture.originalImg
                : croppedBanner.originalImg
            }
          />
        ) : (
          <>
            <div className={styles.images}>
              <div>
                {croppedBanner.croppedImg ? (
                  <img
                    className={styles.banner}
                    src={croppedBanner.croppedImg}
                  ></img>
                ) : (
                  <img
                    className={styles.banner}
                    src={
                      bannerPicture
                        ? bannerPicture
                        : 'https://pbs.twimg.com/profile_banners/1256344213664530433/1603029972/600x200'
                    }
                  ></img>
                )}
                <label className={styles.pictureInput}>
                  <svg>
                    <use href={`${icons}#pictureInput`}></use>
                  </svg>
                  <input
                    className={styles.hidden}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileChange(e, 'banner')}
                  ></input>
                </label>
              </div>

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
                    onChange={(e) => handleFileChange(e, 'profile')}
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
