import {
  Alert,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
} from '../BankingRuleListSelectors';
import BankingRuleListFilterOptions from './BankingRuleListFilterOptions';
import BankingRuleListPageHead from './BankingRuleListPageHead';
import BankingRuleListTable from './BankingRuleListTable';
import PageView from '../../../../components/PageView/PageView';

const BankingRuleListView = ({
  alert,
  loadingState,
  onSort,
  onSelectBankingRule,
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

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(BankingRuleListView);
