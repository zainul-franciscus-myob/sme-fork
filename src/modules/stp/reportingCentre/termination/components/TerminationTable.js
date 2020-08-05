import {
  Button,
  Card,
  DatePicker,
  HeaderSort,
  Icons,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import {
  getEtpCountText,
  hasEtps,
  hasTerminationDate,
} from '../TerminationSelector';
import ReportsEmpty from './TerminationEmpty';
import TableView from '../../../../../components/TableView/TableView';
import handleDateChange from '../../../../../components/handlers/handleDateChange';

const tableConfig = {
  isSelected: {
    columnName: '',
    width: 'auto',
    cellRole: 'checkbox',
    valign: 'middle',
  },
  firstName: {
    columnName: 'First name',
    width: 'flex-1',
    valign: 'middle',
  },
  lastName: {
    columnName: 'Surname or family name',
    width: 'flex-2',
    valign: 'middle',
  },
  etpCount: {
    columnName: 'Employment termination payments (ETP)',
    width: 'flex-2',
    valign: 'middle',
  },
  terminationDate: {
    columnName: 'Employment end date',
    width: 'flex-1',
    valign: 'middle',
    textWrap: 'wrap',
  },
  removeTermination: {
    columnName: '',
    width: 'flex-1',
    valign: 'middle',
  },
};

const TerminationTable = ({
  isTableLoading,
  employees,
  onTerminationDateChange,
  onUnterminateEmployee,
  onSort,
  activeSort,
  featureToggles,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.firstName}>
        <HeaderSort
          title={tableConfig.firstName.columnName}
          sortName="FirstName"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.lastName}>
        <HeaderSort
          title={tableConfig.lastName.columnName}
          sortName="LastName"
          activeSort={activeSort}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.etpCount}>
        {tableConfig.etpCount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.terminationDate}>
        {tableConfig.terminationDate.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.removeTermination} />
    </Table.Header>
  );

  const rows = employees.map((row) => (
    <Table.Row key={row.id} rowData={{ id: row.id }}>
      <Table.RowItem {...tableConfig.firstName}>{row.firstName}</Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>{row.lastName}</Table.RowItem>
      <Table.RowItem {...tableConfig.etpCount}>
        {hasEtps(row.etpCount) &&
        featureToggles &&
        !featureToggles.isPayrollReversibleEnabled ? (
          <a href={row.employeeLink} name="view-etp-link">
            {getEtpCountText(row.etpCount)}
          </a>
        ) : (
          getEtpCountText(row.etpCount)
        )}
        {hasEtps(row.etpCount) &&
          featureToggles &&
          featureToggles.isPayrollReversibleEnabled && (
            <Tooltip>
              View the payment details through the employee summary report in
              EOFY finalisation.
            </Tooltip>
          )}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.terminationDate}>
        {hasTerminationDate(row) ? (
          row.terminationDate
        ) : (
          <DatePicker
            name="terminationDate"
            label="termination date"
            hideLabel
            width="sm"
            placeholder="DD/MM/YYYY"
            value={row.terminationDate}
            onSelect={handleDateChange(
              'terminationDate',
              onTerminationDateChange(row)
            )}
          />
        )}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.removeTermination}>
        {hasTerminationDate(row) ? (
          <Button
            type="link"
            icon={<Icons.Cross />}
            onClick={onUnterminateEmployee(row)}
          >
            Remove termination
          </Button>
        ) : undefined}
      </Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={employees.length === 0}
      emptyView={<ReportsEmpty />}
      onRowSelect={() => {}}
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );

  return <Card body={table} />;
};

export default TerminationTable;
