import { HeaderSort, Label, Table } from '@myob/myob-widgets';
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
import TableView from '../../../../components/TableView/TableView';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';

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
    align: 'left',
    columnName: 'Employees',
  },
  totalNetPay: {
    valign: 'top',
    align: 'right',
    columnName: 'Total net pay ($)',
  },
  isReversal: {
    valign: 'top',
    align: 'center',
    columnName: '',
  },
};

const PayRunListTable = ({
  isTableLoading,
  onSort,
  sortOrder,
  entries,
  isTableEmpty,
  emptyState,
  onStpSignUpClick,
}) => {
  const reversalExistInEntries = entries.some((x) => x.isReversal);
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
      <Table.HeaderItem {...tableConfig.totalNetPay}>
        {tableConfig.totalNetPay.columnName}
      </Table.HeaderItem>
      {reversalExistInEntries ? (
        <Table.HeaderItem {...tableConfig.isReversal}>
          {tableConfig.isReversal.columnName}
        </Table.HeaderItem>
      ) : null}
    </Table.Header>
  );

  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.paymentDate}>
        <a href={entry.link}>{entry.paymentDate}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payPeriod}>
        {entry.payPeriod}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeCount}>
        {entry.employeeCount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.totalNetPay}>
        {formatCurrency(entry.totalNetPay)}
      </Table.RowItem>

      {reversalExistInEntries ? (
        <Table.RowItem {...tableConfig.isReversal}>
          {entry.isReversal ? (
            <Label type="boxed" color="orange">
              Reversed pay
            </Label>
          ) : (
            <div></div>
          )}
        </Table.RowItem>
      ) : null}
    </Table.Row>
  ));

  const emptyView = (
    <PayRunListEmptyView
      emptyState={emptyState}
      onStpSignUpClick={onStpSignUpClick}
    />
  );

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
