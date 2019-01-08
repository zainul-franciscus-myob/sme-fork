import { HeaderSort, Table } from '@myob/myob-widgets';
import React from 'react';

import SpendMoneyTableBody from './SpendMoneyTableBody';

const SpendMoneyTable = (props) => {
  const {
    businessId,
    tableConfig,
    onSort,
    order,
  } = props;

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.date}>
          <HeaderSort title="Date" sortName="date" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
      </Table.Header>
      <SpendMoneyTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </Table>
  );
};

export default SpendMoneyTable;
