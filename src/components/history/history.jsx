import React from "react";
import PT from "prop-types";

import {Currency, currenciesToTranslations, currenciesToEmoji, RATE_PRECISION} from "../../const.js";

import {formatDateISOString} from "../../utils.js";

const MAX_HISTORY_LENGTH = 10;

const propTypes = {
  className: PT.string,
  operations: PT.arrayOf(PT.shape({
    id: PT.string.isRequired,
    date: PT.instanceOf(Date).isRequired,
    originalCurrency: PT.oneOf(Object.values(Currency)).isRequired,
    finalCurrency: PT.oneOf(Object.values(Currency)).isRequired,
    originalCurrencyAmount: PT.number.isRequired,
    finalCurrencyAmount: PT.number.isRequired
  })).isRequired
};

const defaultProps = {className: ``};

const History = ({className: mixClassName, operations}) => {
  const blockClassName = `history`;
  const className = `${mixClassName} ${blockClassName}`;

  return (
    <ol className={className}>
      {operations.slice(0, MAX_HISTORY_LENGTH).map((operation) => {
        const {
          id,
          date,
          originalCurrency,
          finalCurrency,
          originalCurrencyAmount,
          finalCurrencyAmount
        } = operation;

        const dateISOString = formatDateISOString(date);

        return (
          <li className="history__item" key={id}>

            <time
              className="history__date"
              dateTime={dateISOString}>
              {dateISOString}
            </time><br/>

            <span
              className="history__currency"
              aria-label={currenciesToTranslations[originalCurrency]}>
              {currenciesToEmoji[originalCurrency]}
            </span>&nbsp;{originalCurrencyAmount.toFixed(RATE_PRECISION)}

            {` => `}

            <span
              className="history__currency"
              aria-label={currenciesToTranslations[finalCurrency]}>
              {currenciesToEmoji[finalCurrency]}
            </span>&nbsp;{finalCurrencyAmount.toFixed(RATE_PRECISION)}

          </li>
        );
      })}
    </ol>
  );
};

History.propTypes = propTypes;
History.defaultProps = defaultProps;

export default History;
