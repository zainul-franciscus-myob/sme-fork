import PropTypes from 'prop-types';
import React from 'react';

import TabItem from './TabItem';

export const Tabs = ({
  items, onSelected, selected, children,
}) => {
  const nodes = items.map(item => (
    <TabItem
      key={item.id}
      isActive={item.id === selected}
      item={item}
      onSelected={onSelected}
    />
  ));

  return (
    <nav>
      <ul className="flx-tabs">{children || nodes}</ul>
    </nav>
  );
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onSelected: PropTypes.func,
  selected: PropTypes.string,
  children: PropTypes.node,
};

Tabs.defaultProps = {
  items: [],
  onSelected: () => {},
  selected: undefined,
  children: undefined,
};

export default Tabs;
