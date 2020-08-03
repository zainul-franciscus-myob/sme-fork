import { Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './TableHeader.module.css';

const BankFeedsCreditCardsTableHeader = ({ tableConfig }) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem
        columnName={tableConfig.financialInstitution.columnName}
      >
        {tableConfig.financialInstitution.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.cardName.columnName}>
        {tableConfig.cardName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.cardNumber.columnName}>
        {tableConfig.cardNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.linkedAccount.columnName}>
        <>
          {tableConfig.linkedAccount.columnName}
          <Tooltip className={styles.linkedAccountsTooltip}>
            Accounts can only be linked for active bank feeds.
          </Tooltip>
        </>
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.status.columnName}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.removeButton.styles}></Table.HeaderItem>
    </Table.Header>
  </Table>
);

export default BankFeedsCreditCardsTableHeader;
