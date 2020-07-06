import React from "react";
import {shallow} from "enzyme";

import NumberInput from "./number-input.jsx";

describe(`snapshot test: NumberInput`, () => {
  it(`should render correctly`, () => expect(
    shallow(
      <NumberInput
        name={`amount`}
        value={`4`}
        label={`amount`}
        required={false}
        onChange={() => {}}/>
    )
  ).toMatchSnapshot());
});

describe(`e2e test: NumberInput`, () => {
  it(`should call onChange with value`, () => {
    const value = `6`;
    const onChange = jest.fn();

    shallow(
      <NumberInput
        name={`amount`}
        value={`4`}
        label={`amount`}
        required={false}
        onChange={onChange}/>
    ).find(`.number-input`).simulate(`change`, {target: {value}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(value);
  });
});
