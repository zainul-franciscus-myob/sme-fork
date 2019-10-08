/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

/**
 * FilterBar.Group
 *
 * @visibleName
 */
const FilterGroup = ({ children }) => (
  <div className="filter-bar__group">{children}</div>
);

FilterGroup.propTypes = {
  /**
   * One or more children. FilterBar.Group displays children horizontally adjacent
   * with a space inbetween.
   */
  children: PropTypes.node.isRequired,
};

FilterGroup.displayName = 'FilterBar.Group';

export default FilterGroup;
