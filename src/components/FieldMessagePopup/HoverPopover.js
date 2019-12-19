import { Popover } from '@myob/myob-widgets';
import React from 'react';

export default class HoverPopover extends React.Component {
  static defaultProps = {
    id: undefined,
    children: undefined,
    icon: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onMouseEnter = () => this.setState({ isOpen: true });

  onMouseLeave = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const { id, children, icon } = this.props;

    return (
      <span id={id} className="popover-icon" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Popover
          isOpen={isOpen}
          body={<Popover.Body child={children} />}
          preferPlace="above"
          closeOnOuterAction
        >
          {icon}
        </Popover>
      </span>
    );
  }
}
