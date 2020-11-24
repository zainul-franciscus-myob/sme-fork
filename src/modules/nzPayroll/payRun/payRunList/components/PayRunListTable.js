import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmptyState,
  getIsTableLoading,
  getOrder,
  getTableEntries,
  shouldShowEmptyState,
} from '../payRunListSelectors';
import PayRunListEmptyView from './PayRunListEmptyView';
import TableView from '../../../../../components/TableView/TableView';
import formatCurrency from '../../../../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

const tableConfig = {
  paymentDate: {
    valign: 'top',
    columnName: 'Date of payment',
  },
  payPeriod: {
    valign: 'top',
    columnName: 'Pay period',
  },
  employeeCount: {
    valign: 'top',
    align: 'right',
    columnName: 'Employees',
  },
  totalTakeHomePay: {
    valign: 'top',
    align: 'right',
    columnName: 'Total take home pay ($)',
  },
};

const PayRunListTable = ({
  isTableLoading,
  onSort,
  sortOrder,
  entries,
  isTableEmpty,
  emptyState,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.paymentDate}>
        <HeaderSort
          title={tableConfig.paymentDate.columnName}
          sortName="paymentDate"
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeCount}>
        {tableConfig.employeeCount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.totalTakeHomePay}>
        {tableConfig.totalTakeHomePay.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.paymentDate}>
        <a href={entry.link}>{formatSlashDate(entry.paymentDate)}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payPeriod}>
        {`${formatSlashDate(entry.payPeriodStart)} - ${formatSlashDate(
          entry.payPeriodEnd
        )}`}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeCount}>
        {entry.employeeCount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.totalTakeHomePay}>
        {formatCurrency(entry.totalTakeHomePay)}
      </Table.RowItem>
    </Table.Row>
  ));

  const emptyView = <PayRunListEmptyView emptyState={emptyState} />;

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      emptyMessage="Empty table"
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  sortOrder: getOrder(state),
  isTableEmpty: shouldShowEmptyState(state),
  emptyState: getEmptyState(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(PayRunListTable);
