import { HeaderSort, PageState, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
  getTableBodyState,
} from '../CustomerReturnListSelectors';
import CustomerReturnListTableBody from './CustomerReturnListTableBody';
import Icon from '../../../../components/Icon/Icon';
import TableBodyType from '../TableBodyType';
import TableView from '../../../../components/TableView/TableView';
import widthConfig from './widthConfig';

const tableConfig = {
  date: { columnName: 'Issue date', valign: 'top' },
  invoiceNumber: { columnName: 'Invoice number', valign: 'top' },
  customer: { columnName: 'Customer', valign: 'top' },
  customerPurchaseOrderNo: { columnName: 'Customer PO no', valign: 'top' },
  amount: { columnName: 'Amount ($)', valign: 'top', align: 'right' },
  creditAmount: {
    columnName: 'Balance due ($)',
    valign: 'top',
    align: 'right',
  },
  payRefund: { columnName: 'Record refund', valign: 'top' },
  applyToSale: { columnName: 'Apply to sale', valign: 'top' },
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

const CustomerReturnListTable = ({
  tableBodyState,
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  onCreateRefundClick,
  onCreateApplyToSaleClick,
}) => {
  const noResultsPageState = (
    <PageState
      title="No results found :("
      description="Try different filters to find the customer you are looking for."
      image={<Icon.NoResultState alt="No results found" />}
    />
  );

  const emptyPageState = (
    <PageState
      title="No customer returns yet"
      description="Create customer returns for goods returned by your customers, services not used or received by your customers, or credits given to your customers for invoice overpayments."
    />
  );

  const emptyView = {
    [TableBodyType.EMPTY]: emptyPageState,
    [TableBodyType.NO_RESULTS]: noResultsPageState,
  }[tableBodyState];

  const responsiveWidths = widthConfig(tableConfig);
  const header = (
    <Table responsiveWidths={responsiveWidths}>
      <Table.Header>
        <HeaderItem
          config={tableConfig.date}
          sortName="DateOccurred"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.invoiceNumber}
          sortName="DisplayId"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.customer}
          sortName="CustomerName"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.customerPurchaseOrderNo}
          sortName="PurchaseOrderReference"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.amount}
          sortName="Amount"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.creditAmount}
          sortName="BalanceDue"
          activeSort={order}
          onSort={onSort}
        />
        <Table.HeaderItem {...tableConfig.payRefund}>
          {tableConfig.payRefund.columnName}
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.applyToSale}>
          {tableConfig.applyToSale.columnName}
        </Table.HeaderItem>
      </Table.Header>
    </Table>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
    >
      <CustomerReturnListTableBody
        tableConfig={tableConfig}
        onCreateRefundClick={onCreateRefundClick}
        onCreateApplyToSaleClick={onCreateApplyToSaleClick}
      />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  tableBodyState: getTableBodyState(state),
});

export default connect(mapStateToProps)(CustomerReturnListTable);
