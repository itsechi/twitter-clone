import styles from './Button.module.scss';

export const Button = (props) => {
  const styleArray = props.styles.map((style) => styles[style]);

  return (
    <button
      className={[...styleArray, 'btn'].join(' ')}
      onClick={props.clickEvent}
      onMouseOver={props.mouseOverEvent}
      onMouseLeave={props.mouseLeaveEvent}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
