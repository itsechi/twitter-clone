import AvatarEditor from 'react-avatar-editor';
import styles from './EditProfile.module.scss';
import Slider from '@mui/material/Slider';

export const ImageCropper = (props) => {
  return (
    <>
      <AvatarEditor
        className={styles.crop}
        image={props.originalImg}
        width={props.width}
        height={props.height}
        border={50}
        color={[230, 236, 240, 0.7]}
        scale={+props.zoom}
        rotate={0}
        ref={props.editor}
      />
      <Slider
        className={styles.slider}
        step={0.1}
        min={1}
        max={10}
        type="range"
        value={props.zoom}
        onChange={props.handleSlider}
        sx={{
          color: 'rgb(29, 155, 240)',
        }}
      />
    </>
  );
};
