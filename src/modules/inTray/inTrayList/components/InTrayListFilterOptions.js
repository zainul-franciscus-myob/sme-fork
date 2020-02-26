import { Button, Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../selectors/InTrayListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './InTrayListFilterOptions.module.css';

const InTrayListFilterOptions = (props) => {
  const {
    keywords,
    onUpdateFilterOptions,
    onApplyFilter,
  } = props;

  return (
    <Card classes={[styles.filterBar]}>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
      <Button type="secondary" onClick={onApplyFilter}>Apply filter</Button>
    </Card>
  );
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(InTrayListFilterOptions);
