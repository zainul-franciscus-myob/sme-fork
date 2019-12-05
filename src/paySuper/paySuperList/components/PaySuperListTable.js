import { Button, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getSuperPayments } from '../paySuperListSelector';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import PaymentStatus from '../../components/PaymentStatus';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { columnName: 'Date' },
  referenceNumber: { columnName: 'Reference number', width: 'flex-2' },
  employees: { columnName: 'Employees', align: 'right' },
  description: { columnName: 'Description', width: 'flex-3' },
  amount: { columnName: 'Amount ($)', align: 'right' },
  status: { columnName: 'Status', width: 'flex-2' },
};

const PaySuperListTable = ({
  superPayments,
  isTableEmpty,
  onSort,
  sortOrder,
  onReferenceNumberClick,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort
          title={tableConfig.date.columnName}
          sortName={tableConfig.date.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceNumber}>
        <HeaderSort
          title={tableConfig.referenceNumber.columnName}
          sortName={tableConfig.referenceNumber.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employees}>
        <HeaderSort
          title={tableConfig.employees.columnName}
          sortName={tableConfig.employees.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort
          title={tableConfig.description.columnName}
          sortName={tableConfig.description.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title={tableConfig.amount.columnName}
          sortName={tableConfig.amount.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort
          title={tableConfig.status.columnName}
          sortName={tableConfig.status.columnName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );
  const rows = superPayments.map(payment => (
    <Table.Row key={payment.batchPaymentId}>
      <Table.RowItem {...tableConfig.date}>
        {payment.dateOccurred}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.referenceNumber}>
        <Button type="link" onClick={() => { onReferenceNumberClick(payment.batchPaymentId); }}>
          {payment.displayId}
        </Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employees}>
        {payment.employeeCount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        {payment.description}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>
        {payment.amount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <PaymentStatus paymentStatus={payment.status} />
      </Table.RowItem>
    </Table.Row>
  ));

  const emptyView = (
    <NoResultPageState
      title="No super payments found"
    />
  );

  return (
    <TableView
      header={header}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
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
  isTableEmpty: getIsTableEmpty(state),
  superPayments: getSuperPayments(state),
});

export default connect(mapStateToProps)(PaySuperListTable);
