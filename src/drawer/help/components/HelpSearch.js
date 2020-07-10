import { Button, Search } from '@myob/myob-widgets';
import React from 'react';

import styles from './HelpSearch.module.css';

const handleSearchBoxChange = (handler) => (e) => handler(e.target.value);

const HelpSearch = ({ onSearchChange, onSearchClick }) => (
  <>
    <div className={styles.helpSearch}>
      <Search
        label="search box"
        hideLabel
        name="search"
        onChange={handleSearchBoxChange(onSearchChange)}
        className="searchBox"
      />
      <div className="searchButton">
        <Button type="secondary" onClick={onSearchClick}>
          Search
        </Button>
      </div>
    </div>
  </>
);

export default HelpSearch;
