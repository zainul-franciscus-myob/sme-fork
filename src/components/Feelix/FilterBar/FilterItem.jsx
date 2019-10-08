/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

/**
 * FilterBar.Item
 *
 * @visibleName
 */
const FilterItem = ({ children }) => (
  <div className="filter-bar__item">{children}</div>
);

FilterItem.propTypes = {
  /**
   * One or more children. FilterBar.Item stacks content and pushes it inline with
   * the bottom of the FilterBar.
   */
  children: PropTypes.node.isRequired,
};

FilterItem.displayName = 'FilterBar.Item';

export default FilterItem;
