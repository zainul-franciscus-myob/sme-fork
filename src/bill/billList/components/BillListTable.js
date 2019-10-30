import {
  Button, HeaderSort, Icons, PageState, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder, getTableBodyState,
} from '../billListSelectors';
import BillListTableBody from './BillListTableBody';
import TableBodyType from '../TableBodyType';
import TableView from '../../../components/TableView/TableView';
import billsEmptyStateImage from './bills-empty-state.svg';
import noResultStateImage from './no-results-state.svg';
import widthConfig from './widthConfig';

const tableConfig = {
  dateIssued: { columnName: 'Date', valign: 'top' },
  number: { columnName: 'Bill no', valign: 'top' },
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

const BillListTable = ({
  isTableEmpty,
  isTableLoading,
  tableBodyState,
  onSort,
  order,
  onCreateButtonClick,
}) => {
  const header = (
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
  );

  const noResultsPageState = (
    <PageState
      title="No bills found :("
      description="Perhaps check the dates or remove the filters and try again."
      image={<img src={noResultStateImage} style={{ width: '60%' }} alt="No bills found" />}
    />
  );

  const emptyPageState = (
    <PageState
      title="Create bills"
      description="Create a record of the bills you receive from suppliers. You'll be able to keep track of payments and due dates more easily."
      image={<img src={billsEmptyStateImage} style={{ width: '25%' }} alt="Create bills" />}
      actions={[<Button type="link" icon={<Icons.Add />} onClick={onCreateButtonClick}>Create bill</Button>]}
    />
  );

  const tableView = <BillListTableBody tableConfig={tableConfig} />;

  const emptyView = {
    [TableBodyType.EMPTY]: emptyPageState,
    [TableBodyType.NO_RESULTS]: noResultsPageState,
  }[tableBodyState];

  const responsiveWidths = widthConfig(tableConfig);

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      header={header}
      responsiveWidths={responsiveWidths}
    >
      { tableView }
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  tableBodyState: getTableBodyState(state),
});

export default connect(mapStateToProps)(BillListTable);
