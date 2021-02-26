import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Combobox.module.css';

const getAppliedMaxLengthForField = (item, maxLengthForField) => {
  let newItem = item || '';
  if (newItem.length > maxLengthForField) {
    newItem = newItem.substr(0, maxLengthForField);
  }
  return newItem;
};

const constructItemsAndSetSelectedItem = ({
  selectedId,
  maxLengthForField,
  items,
}) => {
  let newItemName = selectedId || '';
  let lists = items;
  let selectedItem = items.find((option) => option.id === newItemName);
  if (!selectedItem && newItemName.trim() !== '') {
    newItemName = getAppliedMaxLengthForField(
      newItemName.trim(),
      maxLengthForField
    );
    const newItem = {
      id: newItemName,
      name: newItemName,
    };

    lists = [newItem, ...lists];
    selectedItem = newItem;
  }
  return { selectedItem, lists };
};

const CreateNewItemCombobox = ({
  selectedId = '',
  items = [],
  onChange,
  left,
  className,
  maxLengthForField = '256',
  metaData,
  addItemLabel = { label: 'Create new item' },
  ...otherProps
}) => {
  let lists = {};
  let selectedItem = {};
  ({ selectedItem, lists } = constructItemsAndSetSelectedItem({
    selectedId,
    maxLengthForField,
    items,
  }));

  const onComboboxChange = (item) => {
    const newItem = item || {};
    const { id = '' } = newItem;
    if (selectedId !== id) {
      onChange(newItem);
    }
  };

  const onAddNewItem = (item) => {
    let newItem = item || '';
    if (selectedId !== newItem) {
      newItem = getAppliedMaxLengthForField(newItem.trim(), maxLengthForField);

      const newItemToAdd = {
        id: newItem,
        name: newItem,
      };
      onChange(newItemToAdd);
    }
  };

  return (
    <FeelixCombobox
      className={classNames(className, {
        [styles.left]: left,
      })}
      metaData={metaData}
      selected={selectedItem || {}}
      onChange={onComboboxChange}
      items={lists}
      addNewItem={{
        onAddNew: (newItem) => {
          onAddNewItem(newItem);
        },
        ...addItemLabel,
      }}
      {...otherProps}
    />
  );
};

export default CreateNewItemCombobox;
