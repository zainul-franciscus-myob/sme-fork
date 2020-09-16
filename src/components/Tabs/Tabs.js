import { Tabs as FeelixTabs, Select } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Tabs.module.css';

const handleSelectChange = (handler) => (e) => {
  const { value } = e.target;
  handler(value);
};

const Tabs = ({ items, selected, onSelected, className }) => (
  <>
    <FeelixTabs
      items={items}
      selected={selected}
      onSelected={onSelected}
      className={classNames(styles.tabs, className)}
    />
    <Select
      name="tabs"
      label="Tabs"
      hideLabel
      value={selected}
      onChange={handleSelectChange(onSelected)}
      className={styles.select}
    >
      {items.map(({ id, label }) => (
        <Select.Option key={id} value={id} label={label} />
      ))}
    </Select>
  </>
);

export default Tabs;
