import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../billListSelectors';
import BillListTableBody from './BillListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  number: { width: 'flex-1', valign: 'top' },
  invoiceNumber: { width: '15rem', valign: 'top' },
  supplier: { width: '20rem', valign: 'top' },
  dateIssued: { width: 'flex-1', valign: 'top' },
  billAmount: { width: 'flex-1', valign: 'top', align: 'right' },
  balanceDue: { width: 'flex-1', valign: 'top', align: 'right' },
  status: { width: 'flex-1', valign: 'top' },
  dateClosed: { width: 'flex-1', valign: 'top' },
};

const BillListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.number}>
        <HeaderSort title="Bill number" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceNumber}>
        <HeaderSort title="Invoice number" sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.supplier}>
        <HeaderSort title="Supplier" sortName="SupplierName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateIssued}>
        <HeaderSort title="Date Issued" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.billAmount}>
        <HeaderSort title="Bill Amount" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.balanceDue}>
        <HeaderSort title="Balance Due" sortName="BalanceDue" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort title="Status" sortName="Status" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateClosed}>
        <HeaderSort title="Date Closed" sortName="DateClosed" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView isLoading={isTableLoading} isEmpty={isTableEmpty} header={header}>
      <BillListTableBody
        tableConfig={tableConfig}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(BillListTable);
