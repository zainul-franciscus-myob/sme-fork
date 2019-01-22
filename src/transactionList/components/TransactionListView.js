import {
  Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../transactionListSelectors';
import Alert from '../../components/Alert/Alert';
import TransactionListFilterOptions from './TransactionListFilterOptions';
import TransactionListPageHead from './TransactionListPageHead';
import TransactionListTable from './TransactionListTable';
import style from './TransactionListView.css';

const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '10.2rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  sourceJournal: { width: '12.4rem', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const TransactionListView = (props) => {
  const {
    businessId,
    isLoading,
    alert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onAddTransaction,
    onDismissAlert,
  } = props;

  const filterBar = (
    <TransactionListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <TransactionListPageHead
      onAddTransaction={onAddTransaction}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const transactionListView = (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          <TransactionListTable
            businessId={businessId}
            tableConfig={tableConfig}
            onSort={onSort}
          />
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : transactionListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(TransactionListView);
