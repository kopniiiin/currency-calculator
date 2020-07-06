import React from "react";
import PT from "prop-types";

const propTypes = {
  className: PT.string,
  label: PT.string.isRequired
};

const defaultProps = {className: ``};

const SubmitButton = ({className: mixClassName, label}) => {
  const blockClassName = `submit-button`;
  const className = `${mixClassName} ${blockClassName}`;

  return <button className={className} type="submit" aria-label={label}/>;
}

SubmitButton.propTypes = propTypes;
SubmitButton.defaultProps = defaultProps;

export default SubmitButton;
