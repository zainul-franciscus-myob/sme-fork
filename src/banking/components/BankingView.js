import {
  Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../bankingSelectors';
import Alert from '../../components/Alert/Alert';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionTable from './BankTransactionTable';
import style from './BankingView.css';

const BankingView = (props) => {
  const {
    isLoading,
    alert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onDismissAlert,
  } = props;

  const filterBar = (
    <BankTransactionFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
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
      <StandardTemplate pageHead="Bank transactions" filterBar={filterBar}>
        <div className={style.list}>
          <BankTransactionTable
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

export default connect(mapStateToProps)(BankingView);
