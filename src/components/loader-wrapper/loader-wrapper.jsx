import React from "react";
import PT from "prop-types";

const propTypes = {
  className: PT.string,
  children: PT.element.isRequired
}

const defaultProps = {className: ``};

const LoaderWrapper = ({className: mixClassName, children}) => {
  const blockClassName = `loader-wrapper`;
  const className = `${mixClassName} ${blockClassName}`;

  return <div className={className}>{children}</div>;
}

LoaderWrapper.propTypes = propTypes;
LoaderWrapper.defaultProps = defaultProps;

export default LoaderWrapper;
