/* eslint-disable react/destructuring-assignment */
import { Button, Icons } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactCollapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import Sticky from 'react-sticky-el';
import classnames from 'classnames';

import find from './helpers/find';
import smoothScrollTo from './helpers/smoothScrolling';
import styles from './Collapsible.css';

// Sticky Header and Footer will become scrollable again when the content displays less than 20%
// in the viewport
const STICKY_CONTENT_DISPLAY_PERCENTAGE = '20'; // percent

/* eslint-disable jsx-a11y/click-events-have-key-events */
class Collapsible extends Component {
  static propTypes = {
    accordionPosition: PropTypes.number, // to be used by Accordion
    children: PropTypes.node.isRequired,
    // PropTypes.instanceOf(Dropdown)? Dropdowns are instances of TrackedComponent
    customizeHeaderContent: PropTypes.func, // to be used by Accordion
    dropdown: PropTypes.element,
    header: PropTypes.element.isRequired,
    expansionToggle: PropTypes.bool,
    extraExpandedHeaderClasses: PropTypes.string,
    extraHeaderClasses: PropTypes.string,
    footer: PropTypes.element,
    handleHeaderClick: PropTypes.func, // to be used by Accordion
    onFullyOpen: PropTypes.func,
    onHoverDropdownToggle: PropTypes.bool,
    open: PropTypes.bool,
    scrollElement: PropTypes.string,
    transitionTime: PropTypes.number,
    smoothScrollingTransitionTime: PropTypes.number,
    breakoutStart: PropTypes.bool,
    breakoutEnd: PropTypes.bool,
    headerClickDisabled: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    stickyFooter: PropTypes.bool,
    stickyPositionRecheckInterval: PropTypes.number,
  };

  static defaultProps = {
    accordionPosition: undefined,
    customizeHeaderContent: undefined,
    dropdown: undefined,
    expansionToggle: false,
    extraExpandedHeaderClasses: '',
    extraHeaderClasses: '',
    handleHeaderClick: undefined,
    onFullyOpen: undefined,
    onHoverDropdownToggle: false,
    open: false,
    scrollElement: undefined,
    transitionTime: 100,
    smoothScrollingTransitionTime: 100,
    breakoutStart: false,
    breakoutEnd: false,
    headerClickDisabled: false,
    stickyHeader: true,
    stickyFooter: true,
    stickyPositionRecheckInterval: 0,
    footer: undefined,
  };

  isDropdownOpen = false;

  constructor(props) {
    super(props);

    this.getHeaderContent = props.customizeHeaderContent
      ? props.customizeHeaderContent.bind(this)
      : this.getDefaultHeaderContent;

    this.state = {
      open: props.open,
      fullyOpen: props.open,
      dropdownVisible: !props.onHoverDropdownToggle,
    };
  }

  componentDidMount() {
    if (this.props.scrollElement) {
      // cache the scrollElement's DOM node
      this.setScrollElementNode(this.props.scrollElement);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { open, onHoverDropdownToggle, scrollElement } = this.props;

    // if there has been a change in the open prop (controlled by accordion or other external
    // component)
    if (open !== nextProps.open && nextProps.open === true) {
      this.open();
    } else if (!nextProps.open) {
      this.close();
    }

    if (scrollElement !== nextProps.scrollElement) {
      // cache the scrollElement's DOM node
      this.setScrollElementNode(nextProps.scrollElement);
    }

    // make the dropdown visible if onHoverDropdownToggle gets disabled (and invisible otherwise)
    if (onHoverDropdownToggle !== nextProps.onHoverDropdownToggle) {
      this.setState({
        dropdownVisible: !nextProps.onHoverDropdownToggle,
      });
    }
  }

  onOpen = () => {
    const { onFullyOpen, scrollElement } = this.props;

    if (scrollElement) {
      const scrollElementBoundingClientRect = this.getScrollElementNode().getBoundingClientRect();
      const scrollElementTop = scrollElementBoundingClientRect.top;
      const scrollElementHeight = scrollElementBoundingClientRect.height;
      const headerBottom = this.headerElement.getBoundingClientRect().bottom;

      const isCollapsibleHeaderBelowParentHalf = this.isCollapsibleHeaderBelowParentHalf(
        headerBottom,
        scrollElementTop,
        scrollElementHeight,
      );
      const isCollapsibleHeaderOutsideParent = this.isCollapsibleHeaderOutsideParent(
        headerBottom,
        scrollElementTop,
      );

      if (
        isCollapsibleHeaderBelowParentHalf
        || isCollapsibleHeaderOutsideParent
      ) {
        const scrollElementScrollTop = this.getScrollElementNode().scrollTop;
        this.scrollCollapsibleHeaderAboveParentHalf(
          headerBottom,
          scrollElementTop,
          scrollElementScrollTop,
          scrollElementHeight,
        );
      }
    }

    this.setState({
      fullyOpen: true,
    });
    if (onFullyOpen) {
      onFullyOpen();
    }
  };

  onClickExpansionButton = (e) => {
    e.stopPropagation();
    this.handleHeaderClick();
  };

  setScrollElementNode = (scrollElement) => {
    this.scrollElement = scrollElement;
    this.scrollElementNode = find(scrollElement, this.collapsibleElement);
  };

  // find(this.scrollElement, this.collapsibleElement)
  getScrollElementNode = () => this.scrollElementNode;

  setUpControls = (dropdown, expansionToggle) => (
    <div className="collapsible__header-controls">
      {this.setUpDropdown(dropdown)}
      {this.setUpExpansionToggle(expansionToggle)}
    </div>
  );

  setUpDropdown = dropdown => dropdown
    && (this.state.dropdownVisible || this.state.open) && (
      // The reason this div exist is that when 'onHoverDropdownToggle', we need to hide the
      // dropdown if the mouse leaves the header, except when the dropdown is opened.
      // TODO: find an alternative to this
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="collapsible__header-controls-dropdown"
        onClick={this.handleDropdownClick}
      >
        {dropdown}
      </div>
  );

  setUpExpansionToggle = expansionToggle => expansionToggle && (
  <div className="collapsible__header-controls-expansion">
    <Button type="secondary" onClick={this.onClickExpansionButton} disabled={this.props.headerClickDisabled}>
      {this.state.open ? <Icons.UpChevron /> : <Icons.DownChevron />}
    </Button>
  </div>
  );

  getDefaultHeaderContent = (header, dropdown, expansionToggle) => (
    <div className="collapsible__header-inner">
      {header}
      {this.setUpControls(dropdown, expansionToggle)}
    </div>
  );

  getHeader = (header, dropdown, expansionToggle, onHoverDropdownToggle) => (
    dropdown || expansionToggle ? (
      <div
        onBlur={onHoverDropdownToggle ? this.handleBlur : undefined}
        onMouseEnter={
          onHoverDropdownToggle ? this.handleHeaderMouseEnter : undefined
        }
        onMouseLeave={
          onHoverDropdownToggle ? this.handleHeaderMouseLeave : undefined
        }
        className="collapsible__header-outer"
      >
        {this.getHeaderContent(header, dropdown, expansionToggle)}
      </div>
    ) : (
      this.getHeaderContent(header, dropdown, expansionToggle)
    ));

  isCollapsibleHeaderBelowParentHalf = (
    headerBottom,
    scrollElementTop,
    scrollElementHeight,
  ) => Math.abs(headerBottom - scrollElementTop) > scrollElementHeight / 2;

  isCollapsibleHeaderOutsideParent = (headerBottom, scrollElementTop) => (
    headerBottom < scrollElementTop
  );

  scrollCollapsibleHeaderAboveParentHalf = (
    headerBottom,
    scrollElementTop,
    scrollElementScrollTop,
    scrollElementHeight,
  ) => {
    const newScrollTop = scrollElementScrollTop
      + (headerBottom - scrollElementTop)
      - scrollElementHeight / 2;
    smoothScrollTo(
      this.getScrollElementNode(),
      newScrollTop,
      this.props.smoothScrollingTransitionTime,
    );
  };

  handleHeaderClick = () => {
    const { handleHeaderClick, accordionPosition } = this.props;

    if (this.state.open && !this.state.fullyOpen) {
      return;
    }

    if (handleHeaderClick) {
      handleHeaderClick(accordionPosition);
    } else if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  };

  toggleDropdownVisibility = display => this.setState({
    dropdownVisible: display,
  });

  close = () => this.setState({
    open: false,
    fullyOpen: false,
  });

  open = () => this.setState({
    open: true,
    fullyOpen: false,
  });

  handleDropdownClick = (e) => {
    this.isDropdownOpen = true;
    e.stopPropagation();
  };

  handleBlur = (e) => {
    e.stopPropagation();

    // e.target is the toggle. go up a level to the button group
    // TODO: find an alternative to findDOMNode
    // eslint-disable-next-line react/no-find-dom-node
    const dropdownButtonGroup = ReactDOM.findDOMNode(e.target.parentNode);
    // relatedTarget is (apparently) experimental but supported in all major browsers (FF 48+, IE
    // 9+, Chrome, Safari) for Blur it returns the next element being focused
    const focusLeavingDropdown = !(
      dropdownButtonGroup && dropdownButtonGroup.contains(e.relatedTarget)
    );

    // only close the dropdown when clicking outside of dropdown
    if (focusLeavingDropdown) {
      window.setTimeout(() => {
        // HACK
        this.toggleDropdownVisibility(false);
        this.isDropdownOpen = false;
      }, 100);
    }
  };

  handleHeaderMouseEnter = () => {
    this.toggleDropdownVisibility(true);
  };

  handleHeaderMouseLeave = () => {
    if (!this.isDropdownOpen) {
      this.toggleDropdownVisibility(false);
    }
  };

  calculateStickyHeaderBottomOffset = () => (
    this.contentElement.offsetHeight * STICKY_CONTENT_DISPLAY_PERCENTAGE / 100
    + this.footerElement.offsetHeight
  );

  calculateStickyFooterBottomOffset = () => (
    this.contentElement.offsetHeight * STICKY_CONTENT_DISPLAY_PERCENTAGE / 100
    + this.headerElement.offsetHeight
  );

  render() {
    const {
      children,
      dropdown,
      expansionToggle,
      footer,
      header,
      extraHeaderClasses,
      extraExpandedHeaderClasses,
      scrollElement,
      onHoverDropdownToggle,
      transitionTime,
      breakoutStart,
      breakoutEnd,
      headerClickDisabled,
      stickyFooter,
      stickyHeader,
      stickyPositionRecheckInterval,
    } = this.props;

    const headerContent = this.getHeader(
      header,
      dropdown,
      expansionToggle,
      onHoverDropdownToggle,
    );

    const collapsibleClassName = 'collapsible';
    const extraCollapsibleClasses = classnames({
      'breakout-start': breakoutStart,
      'breakout-end': breakoutEnd,
      'is-open': this.state.open,
      'is-closed': !this.state.open,
      [styles.collapsible]: true,
    });

    const headerClasses = classnames('collapsible__header', extraHeaderClasses);
    const expandedHeaderClasses = classnames(
      'collapsible__header',
      extraExpandedHeaderClasses,
      styles.collapsible,
    );

    return (
      <ReactCollapsible
        getWrapperDivRef={(c) => {
          this.collapsibleElement = c;
        }}
        getHeaderWrapperDivRef={(c) => {
          this.headerElement = c;
        }}
        getBodyWrapperDivRef={(c) => {
          this.bodyElement = c;
        }}
        classParentString={collapsibleClassName}
        overflowWhenOpen="visible"
        lazyRender
        className={extraCollapsibleClasses}
        handleTriggerClick={this.handleHeaderClick}
        trigger={headerContent}
        triggerDisabled={expansionToggle || headerClickDisabled}
        triggerClassName={headerClasses}
        triggerOpenedClassName={expandedHeaderClasses}
        triggerComponent="div"
        triggerWhenOpen={
          stickyHeader && scrollElement && this.state.fullyOpen ? (
            <Sticky
              bottomOffset={this.calculateStickyHeaderBottomOffset()}
              boundaryElement={`.${collapsibleClassName}`}
              hideOnBoundaryHit={false}
              scrollElement={scrollElement}
              stickyClassName="collapsible__header-sticky"
              positionRecheckInterval={stickyPositionRecheckInterval}
            >
              {headerContent}
            </Sticky>
          ) : (
            headerContent
          )
        }
        onOpen={this.onOpen}
        open={this.state.open}
        openedClassName="is-open"
        onOpening={this.onOpening}
        transitionTime={transitionTime}
      >
        <div
          className="collapsible__content"
          ref={(c) => {
            this.contentElement = c;
          }}
        >
          {children}
        </div>
        {footer && (
          <div
            ref={(c) => {
              this.footerElement = c;
            }}
          >
            {stickyFooter && scrollElement && this.state.fullyOpen ? (
              <Sticky
                bottomOffset={this.calculateStickyFooterBottomOffset()}
                boundaryElement={`.${collapsibleClassName}`}
                hideOnBoundaryHit={false}
                mode="bottom"
                scrollElement={scrollElement}
                stickyClassName="collapsible__footer-sticky"
                positionRecheckInterval={stickyPositionRecheckInterval}
              >
                <div className="collapsible__footer">{footer}</div>
              </Sticky>
            ) : (
              <div className="collapsible__footer">{footer}</div>
            )}
          </div>
        )}
      </ReactCollapsible>
    );
  }
}

export default Collapsible;
