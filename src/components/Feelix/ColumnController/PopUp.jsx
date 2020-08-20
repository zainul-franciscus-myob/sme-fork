/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import { Button, Checkbox } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

// eslint-disable-next-line no-mixed-operators
const mod = (dividend, divisor) => ((dividend % divisor) + divisor) % divisor;

// _.cloneDeep is safer but bigger
const clone = (obj) => JSON.parse(JSON.stringify(obj));

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
export default class PopUp extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        onClick: PropTypes.func,
      })
    ),
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        description: PropTypes.string,
        visible: PropTypes.bool,
      })
    ).isRequired,
    close: PropTypes.func.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    reference: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      active: null,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    if (this.component) {
      this.component.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  setComponentRef = (ref) => {
    this.component = ref;
    this.props.reference(ref);
  };

  handleClick = (event) => {
    if (this.component && !this.component.contains(event.target)) {
      this.props.close();
    }
  };

  handleKeyDown = (event) => {
    const isNavigationKey = ['ArrowDown', 'ArrowUp', 'Tab'].includes(event.key);
    if (isNavigationKey) {
      event.preventDefault();
      const position = this.move(event.key, event.shiftKey);
      this.handleHover(position);
      return;
    }

    const isConfirmKey = ['Enter', ' '].includes(event.key);
    if (isConfirmKey && this.state.active !== null) {
      event.preventDefault();
      this.select(this.state.active);
      return;
    }

    const isEscKey = event.key === 'Escape';
    if (isEscKey) {
      event.preventDefault();
      this.props.close();
    }
  };

  move = (key, shift) => {
    this.component.focus();

    // Tabbing goes to actions, keys only go to the columns.
    let position = this.state.active;
    let navigateUp;
    let navigatableItems;
    if (key === 'Tab') {
      navigateUp = shift;
      navigatableItems = this.props.columns.length + this.props.actions.length;
    } else {
      navigateUp = key === 'ArrowUp';
      navigatableItems = this.props.columns.length;
    }

    if (position !== null) {
      position = navigateUp
        ? mod(position - 1, navigatableItems)
        : (position + 1) % navigatableItems;
      return position;
    }

    return navigateUp ? navigatableItems - 1 : 0;
  };

  handleHover = (index) => {
    this.setState({
      active: index,
    });
  };

  select(index) {
    const columns = clone(this.props.columns);
    const isColumn = index < columns.length;
    if (isColumn) {
      columns[index].visible = !columns[index].visible;
      this.props.onChange(columns);
    } else {
      this.props.actions[columns.length - index].onClick();
    }
  }

  render() {
    const { columns, actions } = this.props;
    const position = {
      top: this.props.position.y,
      left: this.props.position.x,
    };

    return (
      <div
        className="column-controller col-sm-5 col-xs-12"
        ref={this.setComponentRef}
        style={position}
        tabIndex="-1"
        role="menuitem"
        onKeyDown={this.handleKeyDown}
      >
        <div className="columns-holder">
          {columns.map((col, index) => (
            <div
              onMouseOver={() => this.handleHover(index)}
              className={classnames('checkbox-holder', {
                hovered: index === this.state.active,
              })}
              key={col.key}
            >
              <Checkbox
                name={col.key}
                label={col.description}
                checked={col.visible}
                onChange={() => this.select(index)}
              />
            </div>
          ))}
        </div>
        {actions && (
          <div className="actions">
            {actions.map((action, index) => (
              <Button
                key={action.title}
                type="link"
                onClick={action.onClick}
                className={classnames('checkbox-holder', {
                  hovered:
                    this.props.columns.length + index === this.state.active,
                })}
              >
                {action.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

PopUp.defaultProps = {
  actions: undefined,
  position: {
    x: 0,
    y: 0,
  },
};
