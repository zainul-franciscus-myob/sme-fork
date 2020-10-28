import { Table } from '@myob/myob-widgets';
import React from 'react';

import DaysPaidRow from './PayDetailsDaysPaidRow';
import KiwiSaverPayLines from './payLines/KiwiSaverPayLines';
import TaxPayLines from './payLines/TaxPayLines';
import WagePayLines from './payLines/WagePayLines';
import tableConfig from './PayDetailsTableConfig';

const PayDetailsTable = ({
  employeeId,
  employeeName,
  daysPaid,
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
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
      <WagePayLines
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayLineChange={onEmployeePayLineChange}
        onEmployeePayLineBlur={onEmployeePayLineBlur}
      />
      <TaxPayLines
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayLineChange={onEmployeePayLineChange}
        onEmployeePayLineBlur={onEmployeePayLineBlur}
      />
      <KiwiSaverPayLines
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayLineChange={onEmployeePayLineChange}
        onEmployeePayLineBlur={onEmployeePayLineBlur}
      />
    </Table.Body>
  </Table>
);

export default PayDetailsTable;
