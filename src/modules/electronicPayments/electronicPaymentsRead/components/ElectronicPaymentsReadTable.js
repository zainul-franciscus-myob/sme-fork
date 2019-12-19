import { Separator, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../components/TableView/TableView';

const ElectronicPaymentsReadTable = ({ electronicPayments }) => {
  const getRefEntryLink = row => (row.link ? (
    <a href={row.link}>{row.referenceNumber}</a>
  ) : (
    <Tooltip placement="bottom" triggerContent={row.referenceNumber}>
      This transaction type can only be viewed and edited from your desktop AccountRight software
    </Tooltip>
  ));

  const header = (
    <Table.Header>
      <Table.HeaderItem>
        {'Date'}
      </Table.HeaderItem>
      <Table.HeaderItem>
        {'Reference'}
      </Table.HeaderItem>
      <Table.HeaderItem>
        {'Name'}
      </Table.HeaderItem>
      <Table.HeaderItem>
        {'Payment type'}
      </Table.HeaderItem>
      <Table.HeaderItem align="right">
        {'Amount ($)'}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = electronicPayments.map(row => (
    <Table.Row key={row.id}>
      <Table.RowItem columnName="Date">
        {row.date}
      </Table.RowItem>
      <Table.RowItem columnName="Reference number">
        {getRefEntryLink(row)}
      </Table.RowItem>
      <Table.RowItem columnName="Name">
        {row.name}
      </Table.RowItem>
      <Table.RowItem columnName="Payment type">
        {row.paymentTypeDisplay}
      </Table.RowItem>
      <Table.RowItem align="right" columnName="Amount">
        {row.amount}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <Separator />
      <TableView
        header={header}
        isEmpty={electronicPayments.length === 0}
        emptyMessage="No transactions found."
      >
        <Table.Body>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );
};

export default ElectronicPaymentsReadTable;
