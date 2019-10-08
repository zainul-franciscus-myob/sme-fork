/* eslint-disable react/destructuring-assignment */
import { Button } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import { getReactElementPosition } from './generateDimension';
import FilterGroup from './FilterGroup';
import FilterItem from './FilterItem';
import FilterMore from './FilterMore';
import Reparentable from './Reparentable';

/**
 * FilterBar
 *
 * @visibleName
 */
class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = null;
    this.moreFilterRef = null;

    // screen breakpoint that used to sort all component in the more content bar.
    this.smScreenWidth = 500;
    // additional width added in setChildrenInBar method when calculating the stopWidth
    this.insurancePadding = 12;

    this.filterBarWidth = 0;
    this.applyButtonWidth = 0;
    this.resetButtonWidth = 0;
    this.moreButtonWidth = 0;

    this.componentWidths = [];
    this.contentRef = [];
    this.componentsToPlaceInBar = 0;

    this.state = {
      filterButtonName: undefined,
      moreContent: [],
      barContent: [],
    };
  }

  componentDidMount = () => {
    this.renderComponents();
    window.addEventListener('resize', this.handleResize);
  };

  componentDidUpdate(prevProps, prevState) {
    this.checkingContentContainers();
    this.checkingChildrenProps(prevProps, prevState);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  setContainerRef = (element) => {
    this.containerRef = element;
  };

  setMoreFilterRef = (element) => {
    this.moreFilterRef = element;
  };

  setComponentWidths = (notFirstRender = true) => this.contentRef.forEach((refItem, index) => {
    const { width } = getReactElementPosition(refItem);
    if (width !== 0) {
      if (notFirstRender) {
        if (index < this.state.barContent.length) {
          this.componentWidths[index] = width;
        }
      } else {
        this.componentWidths[index] = width;
      }
    }
  });

  getFilterBarWidth = () => getReactElementPosition(this.containerRef).width;

  // Extra width is the "More Filters" button + the Reset Button
  // "More Filters" button is visible if sideContent prop or moreContent state is more than 0
  getExtraWidth = () => {
    const filterBarMoreWidths = this.moreButtonWidth > 0
      ? this.moreButtonWidth : this.resetButtonWidth;
    return filterBarMoreWidths + this.applyButtonWidth;
  };

  // Set the the count of the children in the filter bar as opposed to the "More filters" content
  setChildrenInBar = () => {
    let childCounter = this.props.children.length;
    let stopWidth = 0;
    this.componentWidths.forEach((groupWidth) => {
      const innerContent = stopWidth + groupWidth + this.getExtraWidth();
      if (this.filterBarWidth < innerContent) {
        childCounter -= 1;
      }
      stopWidth += groupWidth + this.insurancePadding;
    });
    this.componentsToPlaceInBar = childCounter;
  };

  checkingChildrenProps = (prevProps, prevstate) => {
    if (
      this.props.children !== prevProps.children
      || this.state.barContent.length !== prevstate.barContent.length
    ) {
      this.setComponentWidths(true);
      this.updateContent();
    }
  };

  checkingContentContainers = () => {
    if (this.state.moreContent.length > 0 || this.props.sideContent) {
      if (this.moreButtonWidth === 0) {
        this.moreButtonWidth = getReactElementPosition(
          this.moreFilterRef,
        ).width;

        this.updateContent();
      }
    } else {
      this.moreButtonWidth = 0;
    }
  };

  sortContent = () => {
    const barRange = Array.from(
      { length: this.componentsToPlaceInBar },
      (x, i) => i,
    );
    const moreRange = Array.from(
      { length: this.props.children.length - this.componentsToPlaceInBar },
      (x, i) => i + this.componentsToPlaceInBar,
    );
    const barContent = barRange.map(index => (
      <Reparentable key={index} el={this.contentRef[index]} />
    ));
    const moreContent = moreRange.map(index => (
      <Reparentable key={index} el={this.contentRef[index]} />
    ));

    return { barContent, moreContent };
  };

  placeContent = () => {
    const { barContent, moreContent } = this.sortContent();
    this.setState({ barContent, moreContent });
  };

  updateButtonName = filterButtonName => this.setState({ filterButtonName });

  updateContent = () => {
    this.componentsToPlaceInBar = 0;
    if (this.filterBarWidth <= this.smScreenWidth) {
      this.updateButtonName('Show filters');
    } else {
      this.setChildrenInBar();
      this.updateButtonName('More filters');
    }
    this.placeContent();
  };

  handleResize = () => {
    this.filterBarWidth = this.getFilterBarWidth();
    this.updateContent();
  };

  /* SME-WEB: Handle onSubmit to prevent entire page reload */
  handleSubmit = handler => (event) => {
    event.preventDefault();

    if (handler) {
      handler(event);
    }
  }

  addRef = index => (ref) => {
    if (ref !== null) {
      this.contentRef[index] = ref;
    }
  };

  refButtonCallback = buttonNameWidth => (element) => {
    if (element) {
      if (this[buttonNameWidth] === 0) {
        this[buttonNameWidth] = getReactElementPosition(element).width;
        this.updateContent();
      }
    }
  };

  renderComponents = () => {
    this.setComponentWidths(false);
    this.filterBarWidth = this.getFilterBarWidth();
    this.updateContent();
  };

  render() {
    const {
      children, sideContent, onReset, onApply,
    } = this.props;
    const showbuttons = this.state.filterButtonName === 'More filters';
    const applyButton = (
      <div
        ref={this.refButtonCallback('applyButtonWidth')}
        className="filter-bar__apply filter-bar__reparentable"
      >
        <div>
          <FilterItem>
            <Button type="secondary" onClick={onApply}>
              Apply filters
            </Button>
            {/* SME-WEB: Add invisible submit button to submit form on hitting Enter key */}
            <button type="submit" hidden="true" />
          </FilterItem>
        </div>
      </div>
    );

    const resetButton = (
      <div
        ref={this.refButtonCallback('resetButtonWidth')}
        className="filter-bar__reset"
      >
        <FilterItem>
          <Button type="link" onClick={onReset}>
            Reset
          </Button>
        </FilterItem>
      </div>
    );

    return (
      <div className="filter-bar" ref={this.setContainerRef}>
        {/* SME-WEB: Add form to enable submit on hitting Enter key */}
        <form onSubmit={this.handleSubmit(onApply)} className="filter-bar__inner">
          {React.Children.map(children, (child, index) => (
            <div ref={this.addRef(index)}>{child}</div>
          ))}
          {this.state.barContent}
          {onApply && showbuttons && applyButton}
        </form>
        <div className="filter-bar__more" ref={this.setMoreFilterRef}>
          {(this.state.moreContent.length > 0 || sideContent) && (
          <FilterMore
            onApply={onApply}
            onReset={onReset}
            filterButtonName={this.state.filterButtonName}
            sideContent={sideContent}
          >
            {this.state.moreContent}
          </FilterMore>
          )}
          {onReset && showbuttons && resetButton}
        </div>
      </div>
    );
  }
}

FilterBar.propTypes = {
  /**
   * One or more filter groups, which will contain options
   */
  children: PropTypes.node.isRequired,
  /**
   * Will show more filter button and nodes will always be visible at the bottom of the side area
   */
  sideContent: PropTypes.node,
  /**
   * Callback supplied to "Apply Filters" button in side panel and on filter bar.
   * If not present no button will be rendered.
   */
  onApply: PropTypes.func,
  /**
   * Callback supplied to "Reset Filters" button in side panel and on filter bar.
   * If not present no button will be rendered.
   */
  onReset: PropTypes.func,
};

FilterBar.defaultProps = {
  sideContent: undefined,
  onApply: undefined,
  onReset: undefined,
};

FilterBar.Group = FilterGroup;
FilterBar.Item = FilterItem;

export default FilterBar;
