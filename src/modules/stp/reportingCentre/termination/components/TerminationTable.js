import {
  Button, Card, Checkbox, DatePicker, Icons, Table,
} from '@myob/myob-widgets';
import React from 'react';

import { getEtpCountText, hasEtps, hasTerminationDate } from '../TerminationSelector';
import ReportsEmpty from './TerminationEmpty';
import TableView from '../../../../../components/TableView/TableView';
import handleDateChange from '../../../../../components/handlers/handleDateChange';
import styles from './TerminationTable.module.css';

const TerminationTable = ({
  tableConfig,
  isTableLoading,
  employees,
  onRowSelect,
  onTerminationDateChange,
  onUnterminateEmployee,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.isSelected}>
        <div className={styles.hiddenCheckbox}>
          <Checkbox label="" name="hidden" hideLabel />
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeName}>
        {tableConfig.employeeName.columnName}
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

  const rows = employees.map(row => (
    <Table.Row key={row.id} rowData={{ id: row.id }}>
      <Table.RowItem {...tableConfig.isSelected}>
        <Checkbox
          name={`${row.id}-select`}
          label={`Select row ${row.name}`}
          hideLabel
          onChange={e => onRowSelect(row, e.target.checked)}
          checked={row.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeName}>
        {row.name}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.etpCount}>
        {hasEtps(row.etpCount) ? (
          <a href={row.employeeLink}>{getEtpCountText(row.etpCount)}</a>
        ) : getEtpCountText(row.etpCount)}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.terminationDate}>
        {hasTerminationDate(row) ? row.terminationDate : (
          <DatePicker
            name="terminationDate"
            label="termination date"
            hideLabel
            width="sm"
            placeholder="DD/MM/YYYY"
            value={row.terminationDate}
            onSelect={handleDateChange('terminationDate', onTerminationDateChange(row))}
          />)}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.removeTermination}>
        {hasTerminationDate(row)
          ? (
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
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  );

  return <Card body={table} />;
};

export default TerminationTable;
