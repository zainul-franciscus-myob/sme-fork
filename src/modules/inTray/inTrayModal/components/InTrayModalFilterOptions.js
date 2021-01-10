import { Search } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getIsEntryLoading,
} from '../selectors/InTrayModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './InTrayModalFilterOptions.module.css';

const InTrayModalFilterOptions = (props) => {
  const {
    filterOptions: { keywords },
    isEntryLoading,
    onUpdateFilterOptions,
  } = props;

  return (
    <>
      <Search
        containerClassName={styles.search}
        disabled={isEntryLoading}
        id="keywords"
        label="Search"
        name="keywords"
        onChange={handleInputChange(onUpdateFilterOptions)}
        value={keywords}
        maxLength={255}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  isEntryLoading: getIsEntryLoading(state),
});

export default connect(mapStateToProps)(InTrayModalFilterOptions);
