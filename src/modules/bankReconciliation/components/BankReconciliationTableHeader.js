import {
  Checkbox, HeaderSort, Table,
} from '@myob/myob-widgets';
import React from 'react';

const BankReconciliationTableHeader = ({
  isActionDisabled,
  headerSelectStatus,
  order,
  tableConfig,
  onSelectAll,
  onSort,
}) => (
  <Table.Header>
    <Table.HeaderItem width="auto">
      <Checkbox
        name="bulkSelect"
        label="Bulk select"
        hideLabel
        onChange={onSelectAll}
        checked={headerSelectStatus === 'checked'}
        indeterminate={headerSelectStatus === 'indeterminate'}
        disabled={isActionDisabled}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.date}>
      <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.reference}>
      <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.description}>
      <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.withdrawal}>
      <HeaderSort title="Withdrawal ($)" sortName="Withdrawal" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.deposit}>
      <HeaderSort title="Deposit ($)" sortName="Deposit" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
  </Table.Header>
);

export default BankReconciliationTableHeader;
