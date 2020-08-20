/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export const rootType = PropTypes.shape({
  getElementById: PropTypes.func.isRequired,
});

export const targetType = PropTypes.shape({
  appendChild: PropTypes.func.isRequired,
  removeChild: PropTypes.func.isRequired,
});

export default class PortalProvider extends React.Component {
  static childContextTypes = {
    target: targetType.isRequired,
    root: rootType.isRequired,
  };

  static propTypes = {
    children: PropTypes.element,
    target: targetType.isRequired,
    root: rootType.isRequired,
  };

  static defaultProps = {
    children: undefined,
  };

  getChildContext() {
    return { target: this.props.target, root: this.props.root };
  }

  render() {
    return this.props.children;
  }
}
