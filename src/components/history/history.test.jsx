import React from "react";
import {shallow} from "enzyme";

import {Currency} from "../../const.js";

import History from "./history.jsx";

describe(`snapshot test: History`, () => {
  it(`should render correctly`, () => expect(
    shallow(
      <History
        operations={[{
          id: `4`,
          date: new Date(`2020-04-04`),
          originalCurrency: Currency.EUR,
          finalCurrency: Currency.EUR,
          originalCurrencyAmount: 4,
          finalCurrencyAmount: 4
        }]}/>
    )
  ).toMatchSnapshot());
});
