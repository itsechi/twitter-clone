import styles from './CloseBtn.module.scss';
import { Icon } from '../Icon/Icon';

export const CloseBtn = (props) => {
  return (
    <div className={styles.closeBtn} onClick={() => props.setModal(false)}>
      <Icon name="close" />
    </div>
  );
};
