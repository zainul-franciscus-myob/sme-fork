import { Card, HeaderSort, Table } from '@myob/myob-widgets';
import React from 'react';

import JobKeeperFortnightCombobox from './JobKeeperFortnightCombobox';
import TableView from '../../../../../components/TableView/TableView';


const tableConfig = {
  firstName: {
    columnName: 'First name', width: 'flex-1', valign: 'middle',
  },
  lastName: {
    columnName: 'Surname or family name', width: 'flex-2', valign: 'middle',
  },
  firstFortnight: {
    columnName: 'First JobKeeper fortnight', width: 'flex-2', valign: 'middle', textWrap: 'wrap',
  },
  finalFortnight: {
    columnName: 'Final JobKeeper fortnight', width: 'flex-2', valign: 'middle', textWrap: 'wrap',
  },
};


const JobKeeperTable = ({
  employees,
  onSort,
  activeSort,
  firstFortnightOptions,
  finalFortnightOptions,
  isTableLoading,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.firstName}>
        <HeaderSort title={tableConfig.firstName.columnName} sortName="FirstName" activeSort={activeSort} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.lastName}>
        <HeaderSort title={tableConfig.lastName.columnName} sortName="LastName" activeSort={activeSort} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.firstFortnight}>
        {tableConfig.firstFortnight.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.finalFortnight}>
        {tableConfig.finalFortnight.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map(row => (
    <Table.Row key={row.id} rowData={{ id: row.id }}>
      <Table.RowItem {...tableConfig.firstName}>
        {row.firstName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>
        {row.lastName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.firstFortnight}>
        <JobKeeperFortnightCombobox
          name="firstFortnightCombobox"
          fortnightOptions={firstFortnightOptions}
          selectedFn={row.firstFortnight}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.finalFortnight}>
        <JobKeeperFortnightCombobox
          name="finalFortnightCombobox"
          fortnightOptions={finalFortnightOptions}
          selectedFn={row.finalFortnight}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={employees.length === 0}
    >
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  );

  const cardBody = (
    <>
      <h3>Confirm employees eligible for JobKeeper payment</h3>
      <p></p>
      <p testid="jobKeeperPaymentHeader">
        Only select the first JobKeeper fortnight for eligible employees and we&apos;ll
        send this information to the ATO. When you want to stop claiming JobKeeper for an employee,
        enter a final JobKeeper fortnight, and notify the ATO.
      </p>
      <p>
        For more information about JobKeeper payments,&nbsp;
        <a href="https://www.ato.gov.au/General/JobKeeper-Payment/Employers/" target="_blank" rel="noopener noreferrer">visit the ATO.</a>
      </p>
      {table}
    </>
  );

  return <Card body={cardBody} />;
};

export default JobKeeperTable;
