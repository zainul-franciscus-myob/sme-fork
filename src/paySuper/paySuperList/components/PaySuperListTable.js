import {
  Button, HeaderSort, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getSortOrder, getSuperPayments,
} from '../paySuperListSelector';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import PaymentStatus from '../../components/PaymentStatus';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { columnName: 'Date', sortName: 'date' },
  referenceNumber: { columnName: 'Reference number', width: 'flex-2', sortName: 'referenceNumber' },
  employees: { columnName: 'Employees', align: 'right', sortName: 'employees' },
  description: { columnName: 'Description', width: 'flex-3', sortName: 'description' },
  amount: { columnName: 'Amount ($)', align: 'right', sortName: 'amount' },
  status: { columnName: 'Status', width: 'flex-2', sortName: 'status' },
};

const PaySuperListTable = ({
  superPayments,
  isTableEmpty,
  isLoading,
  onSort,
  sortOrder,
  onReferenceNumberClick,
  onCreateButtonClick,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort
          title={tableConfig.date.columnName}
          sortName={tableConfig.date.sortName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceNumber}>
        <HeaderSort
          title={tableConfig.referenceNumber.columnName}
          sortName={tableConfig.referenceNumber.sortName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employees}>
        <HeaderSort
          title={tableConfig.employees.columnName}
          sortName={tableConfig.employees.sortName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort
          title={tableConfig.description.columnName}
          sortName={tableConfig.description.sortName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title={tableConfig.amount.columnName}
          sortName={tableConfig.amount.sortName}
          activeSort={sortOrder}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort
          title={tableConfig.status.columnName}
          sortName={tableConfig.status.sortName}
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
        <Button type="link" onClick={() => { onReferenceNumberClick(payment.businessEventId); }}>
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

  const emptyViewActions = [
    <Button
      key={1}
      type="link"
      onClick={onCreateButtonClick}
      icon={<Icons.Add />}
    >
        Create super payment
    </Button>,
  ];
  const emptyView = (
    <NoResultPageState
      title="No super payments found"
      actions={emptyViewActions}
    />
  );

  return (
    <TableView
      header={header}
      isEmpty={isTableEmpty}
      isLoading={isLoading}
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
  isLoading: getIsTableLoading(state),
  superPayments: getSuperPayments(state),
  sortOrder: getSortOrder(state),
});

export default connect(mapStateToProps)(PaySuperListTable);
