import {
  Alert, Button, HeaderSort, PageHead, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getLoadMoreButtonStatus, getOrder,
} from '../billListSelectors';
import BillListFilterOptions from './BillListFilterOptions';
import BillListTable from './BillListTable';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import style from './BillListView.module.css';
import widthConfig from './widthConfig';

const tableConfig = {
  dateIssued: { columnName: 'Issue date', valign: 'top' },
  number: { columnName: 'Bill number', valign: 'top' },
  supplier: { columnName: 'Supplier', valign: 'top' },
  invoiceNumber: { columnName: 'Supplier invoice no', valign: 'top' },
  billAmount: { columnName: 'Amount ($)', valign: 'top', align: 'right' },
  balanceDue: { columnName: 'Balance due ($)', valign: 'top', align: 'right' },
  dateDue: { columnName: 'Due date', valign: 'top' },
  attachment: { columnName: 'Attachment', valign: 'top' },
  status: { columnName: 'Status', valign: 'top' },
};

const HeaderItem = ({
  config, sortName, activeSort, onSort,
}) => (
  <Table.HeaderItem {...config}>
    <HeaderSort
      title={config.columnName}
      sortName={sortName}
      activeSort={activeSort}
      onSort={onSort}
    />
  </Table.HeaderItem>
);

const BillListView = (props) => {
  const {
    isLoading,
    alert,
    order,
    loadMoreButtonStatus,
    onDismissAlert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onCreateButtonClick,
    onLoadMoreButtonClick,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <BillListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Bills">
      <Button onClick={onCreateButtonClick}>Create bill</Button>
    </PageHead>
  );

  const responsiveWidths = widthConfig(tableConfig);

  const tableHeader = (
    <Table responsiveWidths={responsiveWidths}>
      <Table.Header>
        <HeaderItem config={tableConfig.dateIssued} sortName="DateOccurred" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.number} sortName="DisplayId" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.supplier} sortName="SupplierName" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.invoiceNumber} sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.billAmount} sortName="Amount" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.balanceDue} sortName="BalanceDue" activeSort={order} onSort={onSort} />
        <HeaderItem config={tableConfig.dateDue} sortName="DateDue" activeSort={order} onSort={onSort} />
        <Table.HeaderItem {...tableConfig.attachment}>
          { tableConfig.attachment.columnName }
        </Table.HeaderItem>
        <HeaderItem config={tableConfig.status} sortName="Status" activeSort={order} onSort={onSort} />
      </Table.Header>
    </Table>
  );

  const billListTable = (
    <BillListTable
      tableConfig={tableConfig}
      onCreateButtonClick={onCreateButtonClick}
    />
  );

  const billListView = (
    <PaginatedListTemplate
      listTable={billListTable}
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      tableHeader={tableHeader}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
      className={style.list}
    />
  );

  return <PageView isLoading={isLoading} view={billListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  order: getOrder(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(BillListView);
