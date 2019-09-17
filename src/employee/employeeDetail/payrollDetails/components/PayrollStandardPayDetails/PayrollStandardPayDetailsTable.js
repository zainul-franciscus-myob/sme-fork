import {
  FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import PayrollStandardPayDetailsCombinedTableRows from './PayrollStandardPayDetailsCombinedTableRows';
import PayrollStandardPayDetailsExpenseTableRows from './PayrollStandardPayDetailsExpenseTableRows';
import PayrollStandardPayDetailsLeaveTableRows from './PayrollStandardPayDetailsLeaveTableRows';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  hours: { width: '20rem', valign: 'middle', align: 'right' },
  amount: { width: '20rem', valign: 'middle', align: 'right' },
};

const fieldGroupLabel = (
  <div>
    <span>All allocated pay items&nbsp;</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">
      An employee&#39;s allocated pay items makes up their standard pay.
    </Tooltip>
  </div>
);

const getHeaderItemWithTooltip = (title, tooltip) => (
  <div>
    <span>{title}</span>
    <Tooltip triggerContent={<Icons.Info />} placement="right">{tooltip}</Tooltip>
  </div>
);

const hoursHeaderItem = getHeaderItemWithTooltip(
  'Hours (hrs) ',
  'For pay items that are not automatically calculated, type the number of hours that employee usually works in a pay cycle. You can change the hours when processing the pays.',
);

const amountHeaderItem = getHeaderItemWithTooltip(
  'Amount($) ',
  'For pay items that are not automatically calculated, type the amounts that are usually paid or deducted each pay. You can change the amount when processing the pays.',
);

const PayrollStandardPayDetailsTable = props => (
  <FieldGroup label={fieldGroupLabel}>
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.hours}>{hoursHeaderItem}</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amount}>{amountHeaderItem}</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <PayrollStandardPayDetailsCombinedTableRows tableConfig={tableConfig} {...props} />
        <PayrollStandardPayDetailsLeaveTableRows tableConfig={tableConfig} {...props} />
        <PayrollStandardPayDetailsExpenseTableRows tableConfig={tableConfig} {...props} />
      </Table.Body>
    </Table>
  </FieldGroup>
);

export default PayrollStandardPayDetailsTable;
