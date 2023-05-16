import styles from './Modal.module.scss';

export const Modal = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={() => props.setModal(false)}
      ></div>

      {props.modal}
    </div>
  );
};
