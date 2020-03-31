import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Combobox.module.css';

const Combobox = ({
  left, selectedId = '', items = [], onChange, ...props
}) => {
  const selectedItem = items
    .find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    const { id = '' } = newItem;
    if (selectedId !== id) {
      onChange(newItem);
    }
  };

  return (
    <div className={classNames({
      [styles.left]: left,
    })}
    >
      <FeelixCombobox
        selected={selectedItem}
        onChange={onComboboxChange}
        items={items}
        {...props}
      />
    </div>
  );
};

export default Combobox;
