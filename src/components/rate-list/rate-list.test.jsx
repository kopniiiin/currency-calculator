import React from "react";
import {shallow} from "enzyme";

import {Currency} from "../../const.js";

import RateList from "./rate-list.jsx";

describe(`snapshot test: RateList`, () => {
  it(`should render correctly`, () => expect(
    shallow(<RateList rates={[{currency: Currency.EUR}]}/>)
  ).toMatchSnapshot());

  it(`should render rate`, () => expect(
    shallow(<RateList rates={[{currency: Currency.EUR, rate: 4}]}/>)
  ).toMatchSnapshot());
});
