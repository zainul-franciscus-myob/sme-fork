import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPaymentLines } from '../paySuperReadSelector';
import TableView from '../../../components/TableView/TableView';
import formatAmount from '../../../common/valueFormatters/formatAmount';

const tableConfig = {
  date: { columnName: 'Date' },
  payItem: { columnName: 'Pay item', width: 'flex-3' },
  employeeName: { columnName: 'Employee', align: 'left', width: 'flex-3' },
  superannuationFundName: { columnName: 'Superannuation fund', width: 'flex-3' },
  amount: { columnName: 'Amount ($)', align: 'right' },
};

const PaySuperReadTable = ({
  superPaymentLines,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        {tableConfig.date.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payItem}>
        {tableConfig.payItem.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeName}>
        {tableConfig.employeeName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.superannuationFundName}>
        {tableConfig.superannuationFundName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        {tableConfig.amount.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );
  const rows = superPaymentLines.map(payment => (
    <Table.Row key={payment.id}>
      <Table.RowItem {...tableConfig.date}>
        <a href="localhost">{payment.date}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payItem}>
        {payment.payItem}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeName}>
        {payment.employeeName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.superannuationFundName}>
        {payment.superannuationFundName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>
        {formatAmount(payment.amount)}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <TableView
      header={header}
    >
      <Table.Header>

      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  );
};

const mapStateToProps = state => ({
  superPaymentLines: getSuperPaymentLines(state),
});

export default connect(mapStateToProps)(PaySuperReadTable);
