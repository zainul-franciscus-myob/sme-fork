import { Search } from '@myob/myob-widgets';
import React from 'react';

import styles from './FilterBarSearch.module.css';

const FilterBarSearch = ({
  name,
  value,
  maxLength = 255,
  onChange,
}) => (
  <Search
    name={name}
    id={name}
    label="Search"
    placeholder="Search"
    maxLength={maxLength}
    value={value}
    onChange={onChange}
    className={styles.search}
  />
);

export default FilterBarSearch;