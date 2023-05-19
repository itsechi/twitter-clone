import { Icon } from '../Icon/Icon';
import styles from './EditProfile.module.scss';

export const PictureInput = (props) => {
  return (
    <>
      <img
        className={props.type === 'profile' ? styles.profilePic : styles.banner}
        src={props.croppedPicture ? props.croppedPicture : props.picture}
      ></img>
      <label className={styles.pictureInput}>
        <Icon name="pictureInput" />
        <input
          className={styles.hidden}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => props.handleFileChange(e, props.type)}
        ></input>
      </label>
    </>
  );
};
