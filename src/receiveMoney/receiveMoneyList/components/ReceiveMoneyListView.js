import {
  Button, FilterBar, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getIsTableEmpty, getIsTableLoading, getOrder,
} from '../ReceiveMoneyListSelectors';
import Alert from '../../../components/Alert/Alert';
import ReceiveMoneyFilterOptions from './ReceiveMoneyFilterOptions';
import ReceiveMoneyTable from './ReceiveMoneyTable';
import style from './ReceiveMoneyListView.css';

const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '10.2rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const ReceiveMoneyListView = (props) => {
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
    onDismissAlert,
    onCreateNewEntry,
  } = props;

  const filterBar = (
    <FilterBar>
      <ReceiveMoneyFilterOptions
        onUpdateFilters={onUpdateFilters}
        onApplyFilter={onApplyFilter}
      />
    </FilterBar>
  );

  const pageHead = (
    <PageHead title="Receive Money Entries">
      <Button type="primary" onClick={onCreateNewEntry}>Create receive money entry</Button>
    </PageHead>
  );

  const table = (
    <ReceiveMoneyTable
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
      There are no receive money entries for this period.
    </div>
  );

  const receiveMoneyView = (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          {isTableEmpty ? emptyView : tableView}
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : receiveMoneyView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(ReceiveMoneyListView);
