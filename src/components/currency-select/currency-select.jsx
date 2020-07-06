import React from "react";
import PT from "prop-types";

import {Currency, currenciesToTranslations} from "../../const.js";

import CurrencyRadioInput from "../currency-radio-input/currency-radio-input.jsx";

export const Mode = {ORIGINAL: `original`, FINAL: `final`};

const modesToLabels = {
  [Mode.ORIGINAL]: `исходная валюта`,
  [Mode.FINAL]: `итоговая валюта`
};

const propTypes = {
  className: PT.string,
  mode: PT.oneOf(Object.values(Mode)).isRequired,
  activeCurrency: PT.oneOf(Object.values(Currency)).isRequired,
  onChange: PT.func.isRequired
};

const defaultProps = {className: ``};

const CurrencySelect = (props) => {
  const {className: mixClassName, mode, activeCurrency, onChange} = props;

  const blockClassName = `currency-select`;
  const className = `${mixClassName} ${blockClassName}`;
  const label = modesToLabels[mode];

  const inputs = Object.values(Currency).map((currency) => (
    <CurrencyRadioInput
      key={currency}
      currency={currency}
      name={`${mode}-currency`}
      value={currency}
      label={currenciesToTranslations[currency]}
      checked={currency === activeCurrency}
      onChange={onChange}/>
  ));

  return <div className={className} role="group" aria-label={label}>{inputs}</div>;
};

CurrencySelect.propTypes = propTypes;
CurrencySelect.defaultProps = defaultProps;

export default CurrencySelect;
