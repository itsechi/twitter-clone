import styles from './EditProfile.module.scss';
import icons from '../../assets/icons.svg';
import { InputWrap } from './InputWrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../helpers/firebase';
import React from 'react';
import Cropper from 'react-easy-crop';
import AvatarEditor from 'react-avatar-editor';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const EditProfile = (props) => {
  const storage = getStorage();

  const [displayName, setDisplayName] = React.useState(
    props.loggedUser.displayName || ''
  );
  const [description, setDescription] = React.useState(
    props.loggedUser.description || ''
  );
  const [profilePicture, setProfilePicture] = React.useState(
    props.loggedUser.profilePic || ''
  );

  const editor = React.useRef(null);
  const [picture, setPicture] = React.useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: '',
  });

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
  };

  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);

    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
    });
  };

  const handleSave = () => {
    const canvasScaled = editor.current.getImageScaledToCanvas();
    const croppedImg = canvasScaled.toDataURL();

    canvasScaled.toBlob((blob) => {
      setProfilePicture(blob);
      const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
      uploadBytes(storageRef, blob).then(() => {
        console.log('Uploaded a blob or file!');
      });
      getPic();
    });

    setPicture({
      ...picture,
      img: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });
  };

  const getPic = () => {
    const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
    getDownloadURL(storageRef)
      .then((url) => {
        console.log(url);
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
          <button
            onClick={updateProfile}
            className={['btn', styles.btn].join(' ')}
          >
            Save
          </button>
        </div>

        {picture.cropperOpen && (
          <AvatarEditor
            image={picture.img}
            className={styles.crop}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
            ref={editor}
          />
        )}
        <button onClick={handleSave}>Save</button>
        {/* {picture.croppedImg && <img src={picture.croppedImg}></img>} */}

        <div className={styles.inputs}>
          <input type="file" onChange={handleFileChange}></input>
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
      </div>
    </div>
  );
};
