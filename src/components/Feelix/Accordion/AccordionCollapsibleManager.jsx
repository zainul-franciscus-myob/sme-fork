/* eslint-disable react/destructuring-assignment */
import { Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Collapsible from '../Collapsible/Collapsible';
import TableCollapsibleRow from './TableCollapsibleRow';

export default function (ComposedAccordion) {
  class BaseAccordion extends Component {
    isCollapsibleFullyOpen = false;

    constructor(props) {
      super(props);

      this.state = {
        openPosition: props.openPosition,
      };

      this.isCollapsibleFullyOpen = props.openPosition !== undefined;
    }

    componentWillReceiveProps(nextProps) {
      const { openPosition } = this.props;

      this.isCollapsibleFullyOpen = this.props.openPosition !== undefined;
      if (openPosition !== nextProps.openPosition) {
        this.setState({ openPosition: nextProps.openPosition });
      }
    }

    onFullyOpen = () => {
      this.isCollapsibleFullyOpen = true;
    };

    handleHeaderClick = (position) => {
      const { handleHeaderClick } = this.props;

      // Prevent opening one collapsible if another hasn't completely opened
      if (this.state.openPosition === -1 || this.isCollapsibleFullyOpen) {
        this.isCollapsibleFullyOpen = false;
        if (handleHeaderClick) {
          handleHeaderClick(position);
        } else if (this.state.openPosition === position) {
          this.setState({
            openPosition: -1,
          });
        } else {
          this.setState({
            openPosition: position,
          });
        }
      }
    };

    addAccordionPropsToCollapsibles = (
      collapsibles,
      nonCollapsibleChildProcessor,
    ) => {
      const { expansionToggle, onHoverDropdownToggle } = this.props;

      const childrenWithAccordionProps = React.Children.map(
        collapsibles,
        (child, i) => {
          if (!child) return null;
          if (
            child.type === Collapsible
            || child.type === Table.CollapsibleRow
            || child.type === TableCollapsibleRow
          ) {
            return this.addAccordionPropsToCollapsible(
              child,
              this.state.openPosition,
              i,
              this.handleHeaderClick,
              expansionToggle,
              onHoverDropdownToggle,
              this.onFullyOpen,
            );
          } if (nonCollapsibleChildProcessor) {
            return nonCollapsibleChildProcessor(child);
          }
          return child;
        },
      );
      return childrenWithAccordionProps;
    };

    addAccordionPropsToCollapsible = (
      collapsible,
      openPosition,
      index,
      handleHeaderClick,
      expansionToggle,
      onHoverDropdownToggle,
      onFullyOpen,
    ) => {
      const breakoutStart = openPosition !== -1 ? index === openPosition + 1 : false;
      const breakoutEnd = openPosition !== -1 ? index === openPosition - 1 : false;
      const newProps = {
        open: openPosition === index,
        accordionPosition: index,
        handleHeaderClick,
        breakoutStart,
        breakoutEnd,
        onFullyOpen,
      };
      if (expansionToggle) {
        newProps.expansionToggle = expansionToggle;
      }
      if (onHoverDropdownToggle) {
        newProps.onHoverDropdownToggle = onHoverDropdownToggle;
      }
      return React.cloneElement(collapsible, newProps);
    };

    render() {
      const newProps = {
        openPosition: this.state.openPosition,
        handleTriggerClick: this.handleHeaderClick,
        addAccordionPropsToCollapsibles: this.addAccordionPropsToCollapsibles,
      };

      return <ComposedAccordion {...this.props} {...newProps} />;
    }
  }

  BaseAccordion.propTypes = {
    expansionToggle: PropTypes.bool,
    onHoverDropdownToggle: PropTypes.bool,
    handleHeaderClick: PropTypes.func,
    openPosition: PropTypes.number,
  };

  BaseAccordion.defaultProps = {
    expansionToggle: false,
    onHoverDropdownToggle: false,
    handleHeaderClick: undefined,
    openPosition: -1,
  };
  return BaseAccordion;
}
