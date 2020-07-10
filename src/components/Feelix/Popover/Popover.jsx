/* eslint-disable react/destructuring-assignment */

/* *  WARNING WARNING  * */
/*

The underlying library of our Popover component "react-popover" supported react@14 and 15 at its
<0.5.0 releases. "react-popover" began support for react@16 from >=0.5.0 releases, but removed
support for earlier versions of react. Since our move to support react@16 we have also moved to
maintain support for our react@15 customers. Atleast until all are on react@16

There was no release of "react-popover" or alternate library that met feature parity (particularly
the "preferPlace" feature)

There was a PR on "react-popover" which implemented both techniques from <0.5.0 versions and >=0.5.0
versions. This pr was not merged. Rather than fork and re-publish those changes we have copied and
pasted the requisite code. This can be found in PopWrapper.jsx

THIS ONLY EXISTS SO WE CAN MOVE FORWARDS WITH THE COMPONENT LIBRARY

Future iterations of Popover will come under careful consideration by the feelix team.

*/

import { Popover as FeelixPopover } from '@myob/myob-widgets';
import PopWrapper from '@myob/myob-widgets/lib/components/Popover/PopWrapper';
import React from 'react';
import classnames from 'classnames';

const {
  Body: PopoverBody,
  Header: PopoverHeader,
  Footer: PopoverFooter,
} = FeelixPopover;

/**
 * Popover
 * @visibleName
 */
export default class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlled: props.isOpen !== undefined,
      popoverIsOpen: props.isOpen,
    };
  }

  componentDidUpdate({ isOpen }, { controlled }) {
    const { isOpen: newIsOpen } = this.props;

    if (controlled && isOpen !== newIsOpen) {
      this.setPopoverIsOpen(newIsOpen);
    }
  }

  setPopoverIsOpen(popoverIsOpen) {
    this.setState({ popoverIsOpen });
  }

  togglePopover(toState) {
    if (!this.state.controlled) {
      this.setState((previousState) => {
        const popoverIsOpen =
          typeof toState === 'boolean' ? toState : !previousState.popoverIsOpen;
        return { popoverIsOpen };
      });
    }
    this.props.onOuterAction();
  }

  render() {
    const target = (
      <div
        className="flx-popover"
        role="presentation"
        onClick={(e) => this.togglePopover(e)}
      >
        {this.props.children}
      </div>
    );

    const body = (
      <div
        id={this.props.id}
        className={classnames('flx-popover', this.props.classes)}
      >
        {this.props.header && this.props.header}
        {this.props.body && this.props.body}
        {this.props.footer && this.props.footer}
      </div>
    );

    const popoverProps = {
      isOpen: this.state.popoverIsOpen,
      preferPlace: this.props.preferPlace,
      place: this.props.place,
      appendTarget:
        document.querySelector(this.props.appendTarget) || document.body,
      body,
    };
    if (this.props.closeOnOuterAction) {
      popoverProps.onOuterAction = () => this.togglePopover(false);
    }
    return <PopWrapper {...popoverProps}>{target}</PopWrapper>;
  }
}

Popover.defaultProps = {
  id: undefined,
  isOpen: undefined,
  preferPlace: null,
  place: null,
  closeOnOuterAction: undefined,
  classes: null,
  header: undefined,
  body: undefined,
  footer: undefined,
  appendTarget: 'body',
  onOuterAction: () => {},
};

Popover.Header = PopoverHeader;
Popover.Body = PopoverBody;
Popover.Footer = PopoverFooter;
