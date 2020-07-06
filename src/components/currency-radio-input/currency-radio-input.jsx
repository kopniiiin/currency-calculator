import React from "react";
import PT from "prop-types";

import {Currency} from "../../const.js";

const propTypes = {
  className: PT.string,
  currency: PT.oneOf(Object.values(Currency)).isRequired,
  name: PT.string.isRequired,
  value: PT.string.isRequired,
  label: PT.string.isRequired,
  checked: PT.bool.isRequired,
  onChange: PT.func.isRequired
};

const defaultProps = {className: ``};

const CurrencyRadioInput = (props) => {
  const {
    className: mixClassName,
    currency,
    name,
    value,
    label,
    checked,
    onChange
  } = props;

  const blockClassName = `currency-radio-input`;
  const currencyModifierClassName = `${blockClassName}_currency_${currency}`;
  const activeModifierClassName = checked ? `${blockClassName}_active` : ``;
  const className = `${mixClassName} ${blockClassName} ${currencyModifierClassName} ${activeModifierClassName}`;

  return (
    <label className={className}>
      <input
        className="currency-radio-input__input"
        type="radio"
        name={name}
        value={value}
        aria-label={label}
        checked={checked}
        onChange={(evt) => onChange(evt.target.value)}/>
    </label>
  );
};

CurrencyRadioInput.propTypes = propTypes;
CurrencyRadioInput.defaultProps = defaultProps;

export default CurrencyRadioInput;
