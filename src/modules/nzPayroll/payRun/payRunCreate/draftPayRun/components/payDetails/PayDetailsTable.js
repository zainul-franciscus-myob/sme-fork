import { Table } from '@myob/myob-widgets';
import React from 'react';

import DaysPaidRow from './PayDetailsDaysPaidRow';
import KiwiSaverPayItems from './payItems/KiwiSaverPayItems';
import TaxPayItems from './payItems/TaxPayItems';
import WagePayItems from './payItems/WagePayItems';
import tableConfig from './PayDetailsTableConfig';

const PayDetailsTable = ({
  employeeId,
  employeeName,
  daysPaid,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onDaysPaidChange,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name} />
      <Table.HeaderItem {...tableConfig.quantity}>Quantity</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>Amount ($)</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      <DaysPaidRow
        onDaysPaidChange={onDaysPaidChange}
        tableConfig={tableConfig}
        employeeId={employeeId}
        daysPaid={daysPaid}
      />
      <WagePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <TaxPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <KiwiSaverPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
    </Table.Body>
  </Table>
);

export default PayDetailsTable;
