/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default class Reparentable extends React.Component {
  static propTypes = {
    el: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.reparentableRef = null;
  }

  componentDidMount() {
    if (this.reparentableRef) {
      this.reparentableRef.appendChild(this.props.el);
    }
  }

  setReparentableRef = (element) => {
    this.reparentableRef = element;
  };

  render() {
    return (
      <div className="filter-bar__reparentable" ref={this.setReparentableRef} />
    );
  }
}
