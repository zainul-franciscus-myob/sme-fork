import React from 'react';

import { targetType } from './PortalProvider';
import PopUp from './PopUp';
import Portal from './Portal';

const clearSelectedText = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {
    // IE?
    document.selection.empty();
  }
};

export default class ColumnController extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static contextTypes = {
    target: targetType,
  };

  constructor() {
    super();
    this.state = {
      poppedUp: false,
    };
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleRightClick);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleRightClick);
  }

  handleRightClick = (event) => {
    const isInComponent =
      this.component && this.component.contains(event.target);
    const isInPopUp = this.popUp && this.popUp.contains(event.target);
    if (isInComponent && !isInPopUp) {
      event.preventDefault();
      clearSelectedText();
      let x = event.pageX;
      let y = event.pageY;

      const { target } = this.context;

      if (target) {
        const holder = target.getBoundingClientRect();
        y -= holder.top + window.pageYOffset;
        x -= holder.left + window.pageXOffset;
      }
      this.setState({
        poppedUp: true,
        position: {
          x,
          y,
        },
      });
    }
  };

  closePopUp = () => {
    this.setState({
      poppedUp: false,
    });
  };

  componentRef = (ref) => {
    this.component = ref;
  };

  popUpRef = (ref) => {
    this.popUp = ref;
  };

  render() {
    const { poppedUp, position } = this.state;
    const { children } = this.props;
    return (
      <div className="column-controller-wrapper" ref={this.componentRef}>
        {poppedUp && (
          <Portal id="columnController">
            <PopUp
              {...this.props}
              close={this.closePopUp}
              position={position}
              reference={this.popUpRef}
            />
          </Portal>
        )}
        {children}
      </div>
    );
  }
}
