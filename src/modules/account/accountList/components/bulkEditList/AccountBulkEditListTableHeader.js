import { Table } from '@myob/myob-widgets';
import React from 'react';

const HeaderItem = ({ config }) =>
  !config.isHidden && (
    <Table.HeaderItem columnName={config.columnName} {...config.styles}>
      {config.columnName}
    </Table.HeaderItem>
  );

const AccountBulkEditListTableHeader = (props) => {
  const { tableConfig } = props;

  return (
    <Table>
      <Table.Header>
        <HeaderItem config={tableConfig.accountNumber} />
        <HeaderItem config={tableConfig.accountName} />
        <HeaderItem config={tableConfig.type} />
        <HeaderItem config={tableConfig.taxCode} />
        <HeaderItem config={tableConfig.openingBalance} />
        <HeaderItem config={tableConfig.balance} />
      </Table.Header>
    </Table>
  );
};

export default AccountBulkEditListTableHeader;
