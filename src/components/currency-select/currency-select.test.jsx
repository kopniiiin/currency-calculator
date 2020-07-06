import React from "react";
import {shallow} from "enzyme";

import {Currency} from "../../const.js";

import CurrencySelect, {Mode} from "./currency-select.jsx";

describe(`snapshot test: CurrencySelect`, () => {
  it(`should render in original mode`, () => expect(
    shallow(
      <CurrencySelect
        mode={Mode.ORIGINAL}
        activeCurrency={Currency.EUR}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());

  it(`should render in final mode`, () => expect(
    shallow(
      <CurrencySelect
        mode={Mode.FINAL}
        activeCurrency={Currency.EUR}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());
});
