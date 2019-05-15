/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { rootType, targetType } from './PortalProvider';

// This was a triumph
export default class Portal extends React.Component {
  static contextTypes = {
    root: rootType,
    target: targetType,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    let p = this.props.id && this.getRoot().getElementById(this.props.id);
    if (!p) {
      p = document.createElement('div');
      p.id = this.props.id;
      this.getTarget().appendChild(p);
    }
    this.portalElement = p;
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    ReactDOM.render(this.props.children, this.portalElement);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portalElement);
    this.getTarget().removeChild(this.portalElement);
  }

  getRoot() {
    return this.context.root || document;
  }

  getTarget() {
    return this.context.target || document.body;
  }

  render() {
    return null;
  }
}
