import React from "react";
import {shallow} from "enzyme";

import DateInput from "./date-input.jsx";

describe(`snapshot test: DateInput`, () => {
  it(`should render correctly`, () => expect(
    shallow(
      <DateInput
        name={`date`}
        value={`2020-04-04`}
        label={`date`}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());
});

describe(`e2e test: DateInput`, () => {
  it(`should call onChange with value`, () => {
    const value = `2020-06-06`;
    const onChange = jest.fn();

    shallow(
      <DateInput
        name={`date`}
        value={`2020-04-04`}
        label={`date`}
        onChange={onChange}/>
    ).find(`.date-input`).simulate(`change`, {target: {value}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(value);
  });
});
