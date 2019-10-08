/* eslint-disable react/destructuring-assignment */
import { Aside, Button, Separator } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

// import AsideHeader from '../Aside/AsideHeader';
import FilterItem from './FilterItem';

class FilterMore extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    filterButtonName: PropTypes.string,
    onApply: PropTypes.func,
    onReset: PropTypes.func,
    sideContent: PropTypes.node,
  };

  static defaultProps = {
    filterButtonName: 'More filters',
    onApply: undefined,
    onReset: undefined,
    sideContent: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      showMoreFilters: false,
    };
  }

  handleToggle = () => {
    this.setState(prevState => ({
      showMoreFilters: !prevState.showMoreFilters,
    }));
  };

  handleClose = () => {
    this.setState({ showMoreFilters: false });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  /* SME-WEB: Handle onSubmit to prevent entire page reload and close more filters */
  handleSubmit = handler => (event) => {
    event.preventDefault();

    if (handler) {
      this.handleClose();

      handler(event);
    }
  }

  render() {
    const safeActions = (this.props.onApply || this.props.onReset) && (
      <Aside.Actions>
        {this.props.onApply && (
          /* SME-WEB: Close more filters on apply filter */
          <Button onClick={this.handleSubmit(this.props.onApply)} type="link">
            Apply filters
          </Button>
        )}
        {this.props.onReset && (
          <Button onClick={this.props.onReset} type="link">
            Reset
          </Button>
        )}
      </Aside.Actions>
    );
    return (
      <div
        role="menu"
        tabIndex="-1"
        onKeyDown={this.handleKeyDown}
        className="filter-bar__menu"
      >
        <FilterItem>
          <Button
            onClick={this.handleToggle}
            type="secondary"
            className="filter-bar__toggle"
          >
            {this.props.filterButtonName}
          </Button>
        </FilterItem>
        {this.state.showMoreFilters ? (
          /* SME-WEB: Add form to enable submit on hitting Enter key */
          <form onSubmit={this.handleSubmit(this.props.onApply)} className="flx-side-panel">
            <Aside
              header={(
                <Aside.Header
                  actions={safeActions}
                  title="Filters"
                  onClose={this.handleClose}
                />
              )}
            >
              {this.props.children}
              {this.props.children.length > 0 && this.props.sideContent && (
                <Separator />
              )}
              {this.props.sideContent}

              {/* SME-WEB: Add invisible submit button to submit form on hitting Enter key */}
              <button type="submit" hidden="true" />
            </Aside>
          </form>
        ) : (
          /** Children need to always be returned from the
           * render Fn due to the use of Reparentable and
           * it needing to be mounted into the dom.
           */
          <div style={{ display: 'none' }}>
            {this.props.children}
            {' '}
            {this.props.sideContent}
          </div>
        )}
      </div>
    );
  }
}

export default FilterMore;
