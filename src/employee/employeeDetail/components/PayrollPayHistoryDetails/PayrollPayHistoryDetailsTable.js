import {
  FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import PayrollPayHistoryDetailsCombinedTableRows from './PayrollPayHistoryDetailsCombinedTableRowGroup';
import PayrollPayHistoryDetailsExpenseTableRows from './PayrollPayHistoryDetailsExpenseTableRowGroup';
import PayrollPayHistoryDetailsLeaveTableRows from './PayrollPayHistoryDetailsLeaveTableRowGroup';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  hours: { width: '20rem', valign: 'middle', align: 'right' },
  amount: { width: '20rem', valign: 'middle', align: 'right' },
};

const fieldGroupLabel = (
  <div>
    <span>All allocated pay items&nbsp;</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">
      All employee&#39;s allocated pay items are included in their pay history.
    </Tooltip>
  </div>
);

const PayrollPayHistoryDetailsTable = props => (
  <FieldGroup label={fieldGroupLabel}>
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.hours}>Activity (hrs)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amount}>Activity ($)</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <PayrollPayHistoryDetailsCombinedTableRows tableConfig={tableConfig} {...props} />
        <PayrollPayHistoryDetailsLeaveTableRows tableConfig={tableConfig} {...props} />
        <PayrollPayHistoryDetailsExpenseTableRows tableConfig={tableConfig} {...props} />
      </Table.Body>
    </Table>
  </FieldGroup>
);

export default PayrollPayHistoryDetailsTable;
