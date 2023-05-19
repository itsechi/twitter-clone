import React from 'react';
import styles from './EditProfile.module.scss';

export const InputWrap = (props) => {
  const [focus, setFocus] = React.useState(false);

  const handleChange = (e) => {
    props.setInput(e.target.value);
  };

  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={[
        styles.inputWrap,
        focus ? styles.labelFocus : styles.labelBlur,
        props.input && props.input.length > 1 && !focus ? styles.labelFilledInput : '',
      ].join(' ')}
    >
      <label className={'textGray'}>{props.text}</label>
      <input className={styles.input} onChange={handleChange} value={props.input} type="text"></input>
    </div>
  );
};
