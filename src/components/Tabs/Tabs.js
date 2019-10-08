import {
  Tabs as FeelixTabs,
  Select,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './Tabs.module.css';

const handleSelectChange = handler => (e) => {
  const { value } = e.target;
  handler(value);
};

const Tabs = ({
  items,
  selected,
  onSelected,
}) => (
  <>
    <div className={styles.tabs}>
      <FeelixTabs
        items={items}
        selected={selected}
        onSelected={onSelected}
      />
    </div>
    <div className={styles.select}>
      <Select
        name="tabs"
        label="Tabs"
        hideLabel
        value={selected}
        onChange={handleSelectChange(onSelected)}
      >
        {items.map(({ id, label }) => (
          <Select.Option value={id} label={label} />
        ))}
      </Select>
    </div>
    </>

);

export default Tabs;
