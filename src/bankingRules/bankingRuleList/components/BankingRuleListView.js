import {
  PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
} from '../BankingRuleListSelectors';
import BankingRuleListFilterOptions from './BankingRuleListFilterOptions';
import BankingRuleListTable from './BankingRuleListTable';

const BankingRuleListView = ({
  isLoading,
  onSort,
  onApplyFilters,
  onUpdateFilters,
}) => {
  const pageHead = (
    <PageHead title="Bank feed rules" />
  );

  const filterBar = (
    <BankingRuleListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilters={onApplyFilters}
    />
  );

  const view = (
    <StandardTemplate pageHead={pageHead} filterBar={filterBar} sticky="none">
      <BankingRuleListTable
        onSort={onSort}
      />
    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(BankingRuleListView);
