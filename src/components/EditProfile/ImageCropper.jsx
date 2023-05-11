import AvatarEditor from 'react-avatar-editor';
import styles from './EditProfile.module.scss';

export const ImageCropper = (props) => {
  return (
    <div className={styles.cropper}>
      <AvatarEditor
        image={props.originalImg}
        className={styles.crop}
        width={props.width}
        height={props.height}
        border={50}
        color={[230, 236, 240, 0.7]}
        scale={1}
        rotate={0}
        ref={props.editor}
      />
    </div>
  );
};
