import {xml2js} from "xml-js";

import {Currency} from "./const.js";

const DATE_ISO_STRING_LENGTH = 10;

export const formatDateParameter = (date) => (
  `date_req=${
    String(date.getDate()).padStart(2, `0`)
  }/${
    String(date.getMonth() + 1).padStart(2, `0`)
  }/${
    date.getFullYear()
  }`
);

export const formatDateISOString = (date) => date.toISOString().slice(0, DATE_ISO_STRING_LENGTH);

export const getTodayDate = () => new Date(formatDateISOString(new Date()));

export const getTodayDateISOString = () => formatDateISOString(getTodayDate());

export const getRatesFromXML = (xml) => xml2js(xml, {compact: true}).ValCurs.Valute
  .filter(({CharCode: {_text: currency}}) => Currency[currency])
  .reduce((rates, {CharCode: {_text: currency}, Value: {_text: rate}}) => {
    rates[currency] = Number(rate.replace(`,`, `.`));
    return rates;
  }, {});

export const convertHistoryToStorageFormat = (history) => (
  JSON.stringify(history.map((operation) => Object.assign({}, operation, {date: formatDateISOString(operation.date)})))
);

export const convertHistoryFromStorageFormat = (history) => (
  JSON.parse(history).map((operation) => Object.assign({}, operation, {date: new Date(operation.date)}))
);

export const convertCurrencies = (originalCurrencyAmount, originalRate, finalRate) => (
  originalCurrencyAmount * originalRate / finalRate
);
