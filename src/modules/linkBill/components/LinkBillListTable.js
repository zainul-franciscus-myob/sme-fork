import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../LinkBillSelectors';
import LinkBillListTableBody from './LinkBillListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  isSelected: { width: '5rem', valign: 'top' },
  issueDate: { width: '12rem', valign: 'top' },
  supplier: { width: 'flex-1', valign: 'top' },
  supplierInvoiceNumber: { width: 'flex-1', valign: 'top' },
  amount: { width: '20rem', valign: 'top', align: 'right' },
};

const LinkBillListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  onBillSelect,
  order,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem
        {...tableConfig.isSelected}
        columnName="isSelected"
      ></Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.issueDate}>
        <HeaderSort
          title="Issue date"
          sortName="DateOccurred"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.supplier}>
        <HeaderSort
          title="Supplier"
          sortName="SupplierName"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.supplierInvoiceNumber}>
        <HeaderSort
          title="Supplier invoice no"
          sortName="PurchaseOrderReference"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title="Amount ($)"
          sortName="Amount"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
      emptyMessage="There are no bills."
    >
      <LinkBillListTableBody
        tableConfig={tableConfig}
        onBillSelect={onBillSelect}
      />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(LinkBillListTable);
