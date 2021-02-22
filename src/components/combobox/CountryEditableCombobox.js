import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import countryList from '../../sharedData/countryList';
import styles from './Combobox.module.css';

const getAppliedMaxLengthForField = (item, maxLengthForField) => {
  let newItem = item || '';
  if (newItem.length > maxLengthForField) {
    newItem = newItem.substr(0, maxLengthForField);
  }
  return newItem;
};

const constructItemsAndSetSelectedItem = (selectedId, maxLengthForField) => {
  let newCountry = selectedId || '';
  let items = countryList;
  let selectedItem = items.find((option) => option.id === newCountry);
  if (!selectedItem && newCountry.trim() !== '') {
    newCountry = getAppliedMaxLengthForField(
      newCountry.trim(),
      maxLengthForField
    );
    const newItem = {
      id: newCountry,
      name: newCountry,
    };

    items = [newItem, ...items];
    selectedItem = newItem;
  }
  return { selectedItem, items };
};

const CountryEditableCombobox = ({
  selectedId = '',
  onChange,
  left,
  className,
  maxLengthForField = '256',
  ...otherProps
}) => {
  const metaData = [{ columnName: 'name', showData: true }];

  let items = [];
  let selectedItem = {};
  ({ selectedItem, items } = constructItemsAndSetSelectedItem(
    selectedId,
    maxLengthForField
  ));

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
      items={items}
      addNewItem={{
        onAddNew: (newItem) => {
          onAddNewItem(newItem);
        },
        label: <span>Create new location</span>,
      }}
      {...otherProps}
    />
  );
};

export default CountryEditableCombobox;
