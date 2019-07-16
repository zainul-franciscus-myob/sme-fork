import {
  Alert, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../transactionListSelectors';
import TransactionListFilterOptions from './TransactionListFilterOptions';
import TransactionListPageHead from './TransactionListPageHead';
import TransactionListTable from './TransactionListTable';
import style from './TransactionListView.module.css';

const TransactionListView = (props) => {
  const {
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
      <StandardTemplate alert={alertComponent} pageHead={pageHead} filterBar={filterBar} sticky="none">
        <div className={style.list}>
          <TransactionListTable
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
