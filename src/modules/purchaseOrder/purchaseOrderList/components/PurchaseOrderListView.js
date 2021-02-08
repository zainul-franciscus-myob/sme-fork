import { Alert, Button, HeaderSort, PageHead, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsFeatureAvailable,
  getLoadMoreButtonStatus,
  getLoadingState,
  getOrder,
} from '../purchaseOrderListSelectors';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import PurchaseOrderListFilterOptions from './PurchaseOrderListFilterOptions';
import PurchaseOrderListTable from './PurchaseOrderListTable';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';
import style from './PurchaseOrderListView.module.css';
import widthConfig from './widthConfig';

const tableConfig = {
  dateIssued: { columnName: 'Issue date', valign: 'top' },
  number: { columnName: 'PO number', valign: 'top' },
  supplier: { columnName: 'Supplier', valign: 'top' },
  invoiceNumber: { columnName: 'Supplier invoice no', valign: 'top' },
  purchaseOrderAmount: {
    columnName: 'Amount ($)',
    valign: 'top',
    align: 'right',
  },
  balanceDue: { columnName: 'Balance due ($)', valign: 'top', align: 'right' },
  promisedDate: { columnName: 'Promised date', valign: 'top' },
};

const HeaderItem = ({ config, sortName, activeSort, onSort }) => (
  <Table.HeaderItem {...config}>
    <HeaderSort
      title={config.columnName}
      sortName={sortName}
      activeSort={activeSort}
      onSort={onSort}
    />
  </Table.HeaderItem>
);

const PurchaseOrderListView = (props) => {
  const {
    loadingState,
    alert,
    order,
    loadMoreButtonStatus,
    onDismissAlert,
    onUpdateFilters,
    onResetFilters,
    onSort,
    onCreateButtonClick,
    onLoadMoreButtonClick,
    isFeatureAvailable,
  } = props;

  if (!isFeatureAvailable) {
    return <WrongPageState />;
  }

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <PurchaseOrderListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
    />
  );

  const pageHead = (
    <PageHead title="Purchase Orders">
      <Button onClick={onCreateButtonClick}>Create purchase order</Button>
    </PageHead>
  );

  const responsiveWidths = widthConfig(tableConfig);

  const tableHeader = (
    <Table responsiveWidths={responsiveWidths}>
      <Table.Header>
        <HeaderItem
          config={tableConfig.dateIssued}
          sortName="DateOccurred"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.number}
          sortName="DisplayId"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.supplier}
          sortName="SupplierName"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.invoiceNumber}
          sortName="SupplierInvoiceNumber"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.purchaseOrderAmount}
          sortName="Amount"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.balanceDue}
          sortName="BalanceDue"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.promisedDate}
          sortName="PromisedDate"
          activeSort={order}
          onSort={onSort}
        />
      </Table.Header>
    </Table>
  );

  const purchaseOrderListTable = (
    <PurchaseOrderListTable
      tableConfig={tableConfig}
      onCreateButtonClick={onCreateButtonClick}
    />
  );

  const purchaseOrderListView = (
    <PaginatedListTemplate
      listTable={purchaseOrderListTable}
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      tableHeader={tableHeader}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
      className={style.list}
    />
  );

  return <PageView loadingState={loadingState} view={purchaseOrderListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  order: getOrder(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
  isFeatureAvailable: getIsFeatureAvailable(state),
});

export default connect(mapStateToProps)(PurchaseOrderListView);
