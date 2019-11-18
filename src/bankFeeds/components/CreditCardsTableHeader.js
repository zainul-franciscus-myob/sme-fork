import { Table } from '@myob/myob-widgets';
import React from 'react';

const BankFeedsCreditCardsTableHeader = ({
  tableConfig,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem
        columnName={tableConfig.financialInstitution.columnName}
      >
        {tableConfig.financialInstitution.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.cardName.columnName}
      >
        {tableConfig.cardName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.cardNumber.columnName}
      >
        {tableConfig.cardNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.linkedAccount.columnName}
      >
        {tableConfig.linkedAccount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.status.columnName}
      >
        {tableConfig.status.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem width="42px">
      </Table.HeaderItem>
    </Table.Header>
  </Table>
);

export default BankFeedsCreditCardsTableHeader;
