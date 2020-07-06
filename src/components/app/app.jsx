import React, {Component} from "react";
import {nanoid} from "nanoid";

import {Currency} from "../../const.js";

import {
  formatDateISOString,
  getTodayDate,
  getTodayDateISOString,
  convertCurrencies
} from "../../utils.js";

import Storage from "../../storage.js";
import API from "../../api.js";

import DateInput from "../date-input/date-input.jsx";
import RateList from "../rate-list/rate-list.jsx";
import CurrencyConverter from "../currency-converter/currency-converter.jsx";
import History from "../history/history.jsx";
import LoaderWrapper from "../loader-wrapper/loader-wrapper.jsx";

class App extends Component {
  constructor (props) {
    super(props);

    this._storage = new Storage();
    this._api = new API();

    this.state = {
      date: getTodayDate(),
      rates: null,
      originalCurrency: Currency.EUR,
      finalCurrency: Currency.EUR,
      originalCurrencyAmount: `4`,
      finalCurrencyAmount: 4,
      history: this._storage.loadHistory() || []
    };

    this._handleDateChange = this._handleDateChange.bind(this);
    this._handleOriginalCurrencyChange = this._handleOriginalCurrencyChange.bind(this);
    this._handleFinalCurrencyChange = this._handleFinalCurrencyChange.bind(this);
    this._handleOriginalCurrencyAmountChange = this._handleOriginalCurrencyAmountChange.bind(this);
    this._handleCurrencyConverterSubmit = this._handleCurrencyConverterSubmit.bind(this);
  }

  render () {
    const {
      date,
      rates,
      originalCurrency,
      finalCurrency,
      originalCurrencyAmount,
      finalCurrencyAmount,
      history
    } = this.state;

    const dateInput = (
      <DateInput
        name={`date`}
        value={formatDateISOString(date)}
        max={getTodayDateISOString()}
        label={`Дата просмотра курса валют`}
        onChange={this._handleDateChange}/>
    );

    const rateList = rates ?
      <RateList rates={Object.values(Currency).map((currency) => ({currency, rate: rates[currency]}))}/> :
      <RateList rates={Object.values(Currency).map((currency) => ({currency}))}/>;

    const currencyConverter = (
      <CurrencyConverter
        originalCurrency={originalCurrency}
        finalCurrency={finalCurrency}
        originalCurrencyAmount={originalCurrencyAmount}
        finalCurrencyAmount={finalCurrencyAmount}
        onOriginalCurrencyChange={this._handleOriginalCurrencyChange}
        onFinalCurrencyChange={this._handleFinalCurrencyChange}
        onOriginalCurrencyAmountChange={this._handleOriginalCurrencyAmountChange}
        onSubmit={this._handleCurrencyConverterSubmit}/>
    );

    return (
      <main className="app">

        <h1 className="app__title">Калькулятор валют</h1>

        {dateInput}

        {rates ? rateList : <LoaderWrapper>{rateList}</LoaderWrapper>}

        {rates ? currencyConverter : <LoaderWrapper>{currencyConverter}</LoaderWrapper>}

        {history.length ? <History operations={history}/> : ``}

      </main>
    );
  }

  componentDidMount () {
    const {date} = this.state;

    this._api.getRates(date).then((rates) => this.setState({rates}));
  }

  _handleDateChange (dateISOString) {
    const date = new Date(dateISOString);
    this.setState({date, rates: null});
    this._api.getRates(date).then((rates) => this.setState({rates}));
  }

  _handleOriginalCurrencyChange (originalCurrency) {
    this.setState({originalCurrency});
  }

  _handleFinalCurrencyChange (finalCurrency) {
    this.setState({finalCurrency});
  }

  _handleOriginalCurrencyAmountChange (originalCurrencyAmount) {
    this.setState({originalCurrencyAmount});
  }

  _handleCurrencyConverterSubmit () {
    this.setState((state) => {
      const {
        date,
        rates,
        originalCurrency,
        finalCurrency,
        originalCurrencyAmount,
        history
      } = state;

      const numericOriginalCurrencyAmount = Number(originalCurrencyAmount);

      const finalCurrencyAmount = convertCurrencies(
        numericOriginalCurrencyAmount, rates[originalCurrency], rates[finalCurrency]
      );

      const operation = {
        id: nanoid(),
        date,
        originalCurrency,
        finalCurrency,
        originalCurrencyAmount: numericOriginalCurrencyAmount,
        finalCurrencyAmount
      };

      const updatedHistory = [operation, ...history];
      this._storage.saveHistory(updatedHistory);

      return {finalCurrencyAmount, history: updatedHistory};
    });
  }
}

export default App;
