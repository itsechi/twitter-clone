import { InputWrap } from './InputWrap';
import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import React from 'react';

// firebase
import { db, storage } from '../../helpers/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageCropper } from './ImageCropper';
import { Modal } from '../Modal/Modal';
import { CloseBtn } from '../CloseBtn/CloseBtn';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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
      props.setModal(false);
    } catch (error) {
      console.error('Error updating profile in Firebase Database', error);
    }
  };

  const modal = (
    <div className={styles.editModal}>
      <div className={styles.header}>
        <CloseBtn setModal={props.setModal} />

        <h2 className={styles.headerTitle}>
          {!croppedPicture.cropperOpen || !croppedBanner.cropperOpen
            ? 'Edit profile'
            : 'Edit media'}
        </h2>
        {!croppedPicture.cropperOpen && !croppedBanner.cropperOpen ? (
          <Button
            styles={['editProfileBtn']}
            clickEvent={updateProfile}
            text={'Save'}
          />
        ) : (
          <Button
            styles={['editProfileBtn']}
            clickEvent={() =>
              croppedPicture.cropperOpen
                ? handleSave('profile')
                : handleSave('banner')
            }
            text={'Apply'}
          />
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
                <img className={styles.banner} src={bannerPicture}></img>
              )}
              <label className={styles.pictureInput}>
                <Icon name="pictureInput" />
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
                <Icon name="pictureInput" />
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
  );

  return <Modal modal={modal} setModal={props.setModal} />;
};
