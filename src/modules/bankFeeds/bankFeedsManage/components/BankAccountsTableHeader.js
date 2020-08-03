import { Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './TableHeader.module.css';

const BankAccountsTableHeader = ({ tableConfig }) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem
        columnName={tableConfig.financialInstitution.columnName}
      >
        {tableConfig.financialInstitution.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.accountName.columnName}>
        {tableConfig.accountName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.BSB.columnName}>
        {tableConfig.BSB.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.accountNumber.columnName}>
        {tableConfig.accountNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem columnName={tableConfig.linkedAccount.columnName}>
        <>
          {tableConfig.linkedAccount.columnName}
          <Tooltip className={styles.linkedAccountsTooltip}>
            Accounts can only be linked to bank feeds that have been activated.
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

export default BankAccountsTableHeader;
