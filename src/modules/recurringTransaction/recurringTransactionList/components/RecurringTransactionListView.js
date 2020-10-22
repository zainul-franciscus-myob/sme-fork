import { PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
  getIsRecurringTransactionEnabled,
} from '../recurringTransactionListSelectors';
import PageView from '../../../../components/PageView/PageView';
import RecurringTransactionListFilterOptions from './RecurringTransactionListFilterOptions';
import RecurringTransactionListTableBody from './RecurringTransactionListTableBody';
import RecurringTransactionListTableHeader from './RecurringTransactionListTableHeader';
import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';

const tableConfig = {
  transactionName: { width: 'flex-1', columnName: 'Name', valign: 'top' },
  transactionType: { columnName: 'Transaction type', valign: 'top' },
  amount: {
    width: '14.8rem',
    columnName: 'Amount ($)',
    valign: 'top',
    align: 'right',
  },
};

const RecurringTransactionListView = ({
  isLoading,
  onUpdateFilter,
  onResetFilter,
  onSort,
  isRecurringTransactionEnabled,
}) => {
  const filterBar = (
    <RecurringTransactionListFilterOptions
      onUpdateFilter={onUpdateFilter}
      onResetFilter={onResetFilter}
    />
  );

  const recurringTransactionListView = (
    <StandardTemplate
      pageHead={<PageHead title="Recurring Transactions" />}
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
  isLoading: getIsLoading(state),
  isRecurringTransactionEnabled: getIsRecurringTransactionEnabled(state),
});

export default connect(mapStateToProps)(RecurringTransactionListView);
