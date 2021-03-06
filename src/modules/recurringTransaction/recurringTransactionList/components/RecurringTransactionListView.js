import { Alert, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getIsRecurringTransactionEnabled,
} from '../recurringTransactionListSelectors';
import PageView from '../../../../components/PageView/PageView';
import RecurringTransactionListFilterOptions from './RecurringTransactionListFilterOptions';
import RecurringTransactionListPageHead from './RecurringTransactionListPageHead';
import RecurringTransactionListTableBody from './RecurringTransactionListTableBody';
import RecurringTransactionListTableHeader from './RecurringTransactionListTableHeader';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';

const tableConfig = {
  transactionName: { width: 'flex-1', columnName: 'Name', valign: 'top' },
  transactionType: { columnName: 'Transaction type', valign: 'top' },
  frequency: { columnName: 'Frequency', valign: 'top' },
  overdue: { columnName: 'Overdue', valign: 'top' },
  lastPosted: { columnName: 'Last posted', valign: 'top' },
  nextDue: { columnName: 'Next due', valign: 'top' },
  amount: {
    width: '14.8rem',
    columnName: 'Amount ($)',
    valign: 'top',
    align: 'right',
  },
};

const RecurringTransactionListView = ({
  alert,
  isLoading,
  onDismissAlert,
  onUpdateFilter,
  onResetFilter,
  onSort,
  onCreateButtonClick,
  isRecurringTransactionEnabled,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <RecurringTransactionListFilterOptions
      onUpdateFilter={onUpdateFilter}
      onResetFilter={onResetFilter}
    />
  );

  const recurringTransactionListView = (
    <StandardTemplate
      pageHead={
        <RecurringTransactionListPageHead
          onCreateButtonClick={onCreateButtonClick}
        />
      }
      alert={alertComponent}
      filterBar={filterBar}
      tableHeader={
        <RecurringTransactionListTableHeader
          tableConfig={tableConfig}
          onSort={onSort}
        />
      }
    >
      <RecurringTransactionListTableBody tableConfig={tableConfig} />
    </StandardTemplate>
  );

  const view = isRecurringTransactionEnabled ? (
    recurringTransactionListView
  ) : (
    <WrongPageState />
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isRecurringTransactionEnabled: getIsRecurringTransactionEnabled(state),
});

export default connect(mapStateToProps)(RecurringTransactionListView);
