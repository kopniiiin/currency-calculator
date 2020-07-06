import React from "react";
import {shallow} from "enzyme";

import {Currency} from "../../const.js";

import CurrencyRadioInput from "./currency-radio-input.jsx";

describe(`snapshot test: CurrencyRadioInput`, () => {
  it(`should render correctly`, () => expect(
    shallow(
      <CurrencyRadioInput
        currency={Currency.EUR}
        name={`currency`}
        value={Currency.EUR}
        label={`currency`}
        checked={false}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());

  it(`should render checked`, () => expect(
    shallow(
      <CurrencyRadioInput
        currency={Currency.EUR}
        name={`currency`}
        value={Currency.EUR}
        label={`currency`}
        checked={true}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());
});

describe(`e2e test: CurrencyRadioInput`, () => {
  it(`should call onChange with value`, () => {
    const value = Currency.EUR;
    const onChange = jest.fn();

    shallow(
      <CurrencyRadioInput
        currency={Currency.EUR}
        name={`currency`}
        value={value}
        label={`currency`}
        checked={false}
        onChange={onChange}/>
    ).find(`.currency-radio-input__input`).simulate(`change`, {target: {value}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(value);
  });
});
