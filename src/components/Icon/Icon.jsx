import icons from '../../assets/icons.svg';

export const Icon = (props) => {
  return (
    <svg className={props.styles}>
      <use href={`${icons}#${props.name}`}></use>
    </svg>
  );
};
