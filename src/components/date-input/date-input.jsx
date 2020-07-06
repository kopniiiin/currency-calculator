import React from "react";
import PT from "prop-types";

const propTypes = {
  className: PT.string,
  name: PT.string.isRequired,
  value: PT.string.isRequired,
  max: PT.string,
  label: PT.string.isRequired,
  onChange: PT.func.isRequired
};

const defaultProps = {className: ``, max: ``};

const DateInput = (props) => {
  const {className: mixClassName, name, value, max, label, onChange} = props;

  const blockClassName = `date-input`;
  const className = `${mixClassName} ${blockClassName}`;

  return (
    <input
      className={className}
      type="date"
      name={name}
      value={value}
      max={max}
      aria-label={label}
      onChange={(evt) => onChange(evt.target.value)}/>
  );
};

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default DateInput;
