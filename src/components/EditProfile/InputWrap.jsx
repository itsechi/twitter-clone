import React from 'react';
import styles from './EditProfile.module.scss';

export const InputWrap = (props) => {
  const [focus, setFocus] = React.useState(false);
  const [input, setInput] = React.useState(props.input ? props.input : '');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={[
        styles.inputWrap,
        focus ? styles.labelFocus : styles.labelBlur,
        input.length > 1 && !focus ? styles.labelFilledInput : '',
      ].join(' ')}
    >
      <label className={'textGray'}>{props.text}</label>
      <input onChange={handleChange} value={input} type="text"></input>
    </div>
  );
};
