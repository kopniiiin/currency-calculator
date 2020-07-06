import React from "react";
import PT from "prop-types";

import {RATE_PRECISION} from "../../const.js";

const propTypes = {
  className: PT.string,
  name: PT.string.isRequired,
  value: PT.string.isRequired,
  label: PT.string.isRequired,
  required: PT.bool.isRequired,
  onChange: PT.func.isRequired
};

const defaultProps = {className: ``};

const NumberInput = (props) => {
  const {className: mixClassName, name, value, label, required, onChange} = props;

  const blockClassName = `number-input`;
  const className = `${mixClassName} ${blockClassName}`;

  return (
    <input
      className={className}
      type="text"
      name={name}
      value={value}
      pattern={`(0(?=\\.)|[1-9])\\d*(\\.\\d{1,${RATE_PRECISION}})?`}
      autoComplete="off"
      aria-label={label}
      required={required}
      onChange={(evt) => onChange(evt.target.value)}/>
  );
}

NumberInput.propTypes = propTypes;
NumberInput.defaultProps = defaultProps;

export default NumberInput;
