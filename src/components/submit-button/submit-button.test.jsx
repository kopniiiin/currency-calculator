import React from "react";
import {shallow} from "enzyme";

import SubmitButton from "./submit-button.jsx";

describe(`snapshot test: SubmitButton`, () => {
  it(`should render correctly`, () => expect(
    shallow(<SubmitButton label={`button`}/>)
  ).toMatchSnapshot());
});
