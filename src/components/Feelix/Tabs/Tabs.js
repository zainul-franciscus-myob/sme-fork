import React from 'react';
import classNames from 'classnames';

import TabItem from './TabItem';

const Tabs = ({ items, onSelected, selected, children, className }) => {
  const nodes = items.map((item) => (
    <TabItem
      key={item.id}
      isActive={item.id === selected}
      item={item}
      onSelected={onSelected}
    />
  ));

  return (
    <nav>
      <ul className={classNames(className, 'flx-tabs')}>{children || nodes}</ul>
    </nav>
  );
};

export default Tabs;
