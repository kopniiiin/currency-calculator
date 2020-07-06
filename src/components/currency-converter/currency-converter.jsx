import React from "react";
import PT from "prop-types";

import {Currency, currenciesToTranslations, RATE_PRECISION} from "../../const.js";

import CurrencySelect, {Mode as CurrencySelectMode} from "../currency-select/currency-select.jsx";
import NumberInput from "../number-input/number-input.jsx";
import SubmitButton from "../submit-button/submit-button.jsx";

const propTypes = {
  className: PT.string,
  originalCurrency: PT.oneOf(Object.values(Currency)).isRequired,
  finalCurrency: PT.oneOf(Object.values(Currency)).isRequired,
  originalCurrencyAmount: PT.string.isRequired,
  finalCurrencyAmount: PT.number.isRequired,
  onOriginalCurrencyChange: PT.func.isRequired,
  onFinalCurrencyChange: PT.func.isRequired,
  onOriginalCurrencyAmountChange: PT.func.isRequired,
  onSubmit: PT.func.isRequired
};

const defaultProps = {className: ``};

const CurrencyConverter = (props) => {
  const {
    className: mixClassName,
    originalCurrency,
    finalCurrency,
    originalCurrencyAmount,
    finalCurrencyAmount,
    onOriginalCurrencyChange,
    onFinalCurrencyChange,
    onOriginalCurrencyAmountChange,
    onSubmit
  } = props;

  const blockClassName = `currency-converter`;
  const className = `${mixClassName} ${blockClassName}`;

  const currencySelectElementClassName = `${blockClassName}__currency-select`;
  const submitButtonElementClassName = `${blockClassName}__submit-button`;

  const numberInputLabel = `Количество ${currenciesToTranslations[originalCurrency]}`;
  const finalCurrencyAmountLabel = `Количество ${currenciesToTranslations[finalCurrency]} ${finalCurrencyAmount}`;

  return (
    <form
      className={className}
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit();
      }}>

      <CurrencySelect
        className={currencySelectElementClassName}
        mode={CurrencySelectMode.ORIGINAL}
        activeCurrency={originalCurrency}
        onChange={onOriginalCurrencyChange}/>

      <NumberInput
        name={`original-currency-amount`}
        value={originalCurrencyAmount}
        label={numberInputLabel}
        required={true}
        onChange={onOriginalCurrencyAmountChange}/>

      <SubmitButton
        className={submitButtonElementClassName}
        label={`Конвертировать валюту`}/>

      <CurrencySelect
        className={currencySelectElementClassName}
        mode={CurrencySelectMode.FINAL}
        activeCurrency={finalCurrency}
        onChange={onFinalCurrencyChange}/>

      <span
        className="currency-converter__final-currency-amount"
        aria-label={finalCurrencyAmountLabel}>
        {finalCurrencyAmount.toFixed(RATE_PRECISION)}
      </span>

    </form>
  );
};

CurrencyConverter.propTypes = propTypes;
CurrencyConverter.defaultProps = defaultProps;

export default CurrencyConverter;
