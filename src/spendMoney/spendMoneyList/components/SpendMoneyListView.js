import {
  Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getIsTableEmpty, getIsTableLoading, getOrder,
} from '../spendMoneyListSelectors';
import Alert from '../../../components/Alert/Alert';
import SpendMoneyFilterOptions from './SpendMoneyFilterOptions';
import SpendMoneyTable from './SpendMoneyTable';
import style from './SpendMoneyListView.css';

const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '10.2rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const SpendMoneyListView = (props) => {
  const {
    businessId,
    isLoading,
    alert,
    isTableEmpty,
    isTableLoading,
    order,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onCreateNewEntry,
    onDismissAlert,
  } = props;

  const filterBar = (
    <SpendMoneyFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Spend Money Entries">
      <Button type="primary" onClick={onCreateNewEntry}>Create spend money entry</Button>
    </PageHead>
  );

  const table = (
    <SpendMoneyTable
      businessId={businessId}
      order={order}
      tableConfig={tableConfig}
      onSort={onSort}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const tableView = isTableLoading
    ? (
      <div className={style.spinner}>
        <Spinner size="medium" />
      </div>
    )
    : table;

  const emptyView = (
    <div className={style.empty}>
      There are no spend money entries for this period.
    </div>
  );

  const spendMoneyView = (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          {isTableEmpty ? emptyView : tableView}
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : spendMoneyView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(SpendMoneyListView);
