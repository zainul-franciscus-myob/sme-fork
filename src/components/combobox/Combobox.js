import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Combobox.module.css';

const buildItems = ({ hasAllItem, items, selectedId, allItemColumnName }) => {
  const allItem = { [allItemColumnName]: 'All' };
  const allItemIsSelected = selectedId === '';

  if (hasAllItem && !allItemIsSelected) {
    return [allItem, ...items];
  }
  return items;
};

const Combobox = ({
  selectedId = '',
  items = [],
  onChange,
  hasAllItem,
  allItemColumnName = '',
  left,
  className,
  ...otherProps
}) => {
  const selectedItem = items.find((option) => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    const { id = '' } = newItem;
    if (selectedId !== id) {
      onChange(newItem);
    }
  };

  return (
    <FeelixCombobox
      className={classNames(className, {
        [styles.left]: left,
        [styles.allPlaceholder]: hasAllItem,
      })}
      selected={selectedItem}
      onChange={onComboboxChange}
      items={buildItems({
        hasAllItem,
        items,
        selectedId,
        allItemColumnName,
      })}
      {...otherProps}
    />
  );
};

export default Combobox;
