import React from "react";
import {shallow} from "enzyme";

import LoaderWrapper from "./loader-wrapper.jsx";

describe(`snapshot test: LoaderWrapper`, () => {
  it(`should render correctly`, () => expect(
    shallow(<LoaderWrapper>🦥</LoaderWrapper>)
  ).toMatchSnapshot());
});
