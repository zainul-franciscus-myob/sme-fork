import {
  Alert,
  Spinner,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../BankingRuleListSelectors';
import BankingRuleListFilterOptions from './BankingRuleListFilterOptions';
import BankingRuleListPageHead from './BankingRuleListPageHead';
import BankingRuleListTable from './BankingRuleListTable';

const BankingRuleListView = ({
  alert,
  isLoading,
  onSort,
  onSelectBankingRule,
  onApplyFilters,
  onUpdateFilters,
  onDismissAlert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <BankingRuleListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilters={onApplyFilters}
    />
  );

  const view = (
    <StandardTemplate
      pageHead={<BankingRuleListPageHead onSelectBankingRule={onSelectBankingRule} />}
      filterBar={filterBar}
      sticky="none"
      alert={alertComponent}
    >
      <BankingRuleListTable
        onSort={onSort}
      />
    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(BankingRuleListView);
