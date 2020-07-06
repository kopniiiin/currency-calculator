import React from "react";
import {shallow} from "enzyme";

import {Currency} from "../../const.js";

import CurrencyConverter from "./currency-converter.jsx";

describe(`snapshot test: CurrencyConverter`, () => {
  it(`should render correctly`, () => expect(
    shallow(
      <CurrencyConverter
        originalCurrency={Currency.EUR}
        finalCurrency={Currency.EUR}
        originalCurrencyAmount={`4`}
        finalCurrencyAmount={4}
        onOriginalCurrencyChange={() => {}}
        onFinalCurrencyChange={() => {}}
        onOriginalCurrencyAmountChange={() => {}}
        onSubmit={() => {}}/>
    )
  ).toMatchSnapshot());
});

describe(`e2e test: CurrencyConverter`, () => {
  it(`should call onSubmit and preventDefault`, () => {
    const onSubmit = jest.fn();
    const preventDefault = jest.fn();

    shallow(
      <CurrencyConverter
        originalCurrency={Currency.EUR}
        finalCurrency={Currency.EUR}
        originalCurrencyAmount={`4`}
        finalCurrencyAmount={4}
        onOriginalCurrencyChange={() => {}}
        onFinalCurrencyChange={() => {}}
        onOriginalCurrencyAmountChange={() => {}}
        onSubmit={onSubmit}/>
    ).find(`.currency-converter`).simulate(`submit`, {preventDefault});

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});
