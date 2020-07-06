import React from "react";
import PT from "prop-types";

import {Currency, currenciesToTranslations, currenciesToEmoji, RATE_PRECISION} from "../../const.js";

const propTypes = {
  className: PT.string,
  rates: PT.arrayOf(PT.shape({
    currency: PT.oneOf(Object.values(Currency)).isRequired,
    rate: PT.number
  })).isRequired
};

const defaultProps = {className: ``};

const RateList = ({className: mixClassName, rates}) => {
  const blockClassName = `rate-list`;
  const className = `${mixClassName} ${blockClassName}`;

  return (
    <ul className={className}>
      {rates.map(({currency, rate}) => (
        <li className="rate-list__item" key={currency}>
          <span
            className="rate-list__currency"
            aria-label={currenciesToTranslations[currency]}>
            {currenciesToEmoji[currency]}
          </span> = {rate ? rate.toFixed(RATE_PRECISION) : `?`}&nbsp;руб
        </li>
      ))}
    </ul>
  );
};

RateList.propTypes = propTypes;
RateList.defaultProps = defaultProps;

export default RateList;
