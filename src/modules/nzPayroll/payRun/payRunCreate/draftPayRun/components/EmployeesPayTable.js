import {
  AccordionTable,
  Card,
  Checkbox,
  FieldGroup,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormattedEmployeePayLines,
  getIsAllSelected,
  getIsPartiallySelected,
  getNumberOfSelected,
  getTotals,
} from '../DraftPayRunSelectors';
import PayDetailsTable from './payDetails/PayDetailsTable';
import handleCheckboxChange from '../../../../../../components/handlers/handleCheckboxChange';
import styles from './EmployeesPayTable.module.css';

const tableConfig = {
  employee: {
    width: 'flex-2',
    columnName: 'Employee',
    testClass: 'column-type-test-class',
  },
  daysPaid: {
    width: 'flex-1',
    columnName: 'Days Paid',
    align: 'right',
    testClass: 'column-type-test-class',
  },
  gross: {
    width: 'flex-1',
    columnName: 'Gross ($)',
    align: 'right',
    testClass: 'column-type-test-class',
  },
  paye: {
    width: 'flex-1',
    columnName: 'PAYE ($)',
    align: 'right',
    testClass: 'column-type-test-class',
  },
  kiwiSaver: {
    width: 'flex-1',
    columnName: 'KiwiSaver ($)',
    align: 'right',
    testClass: 'column-type-test-class',
  },
  takeHomePay: {
    width: 'flex-1',
    columnName: 'Take home pay ($)',
    align: 'right',
    testClass: 'column-type-test-class',
  },
};

const handleEmployeeCheckboxChange = (handler, id) => () => handler(id);

const EmployeesPayTable = ({
  lines,
  isAllSelected,
  isPartiallySelected,
  totals,
  numberOfSelected,
  onSelectRow,
  onSelectAllRows,
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
  onDaysPaidChange,
}) => (
  <Card>
    <div className={styles.employeePayTable}>
      <FieldGroup label="Select employees to pay">
        {`${numberOfSelected} employees selected`}
      </FieldGroup>
      <AccordionTable
        expansionToggle
        header={
          <Table.Header>
            <Table.HeaderItem width="5rem">
              <Checkbox
                name="bulk-select"
                label="Bulk select"
                testid="bulkSelectCheckbox"
                hideLabel
                onChange={handleCheckboxChange(onSelectAllRows)}
                checked={isAllSelected}
                indeterminate={isPartiallySelected}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.employee}>
              Employee
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.daysPaid}>
              Days paid&nbsp;
              <Tooltip>
                Number of whole or part days where employee earned gross
                earnings, including any paid holiday or paid leave. E.g.
                Employee works a half day on Tuesday, a half day on Wednesday,
                and takes Thursday as paid sick leave would be paid on 3 days.
              </Tooltip>
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.gross}>
              Gross ($)
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.paye}>PAYE ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.kiwiSaver}>
              KiwiSaver ($)
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.takeHomePay}>
              Take home pay ($)
            </Table.HeaderItem>
          </Table.Header>
        }
        body={
          <Table.Body>
            {lines.map((line) => (
              <Table.CollapsibleRow
                key={`expansion-toggle-${line.employeeId}`}
                header={
                  <Table.Row
                    key={line.employeeId}
                    testId={`employee-${line.employeeId}-row`}
                  >
                    <Table.RowItem width="5rem">
                      <Checkbox
                        name={`${line.employeeId}-select`}
                        label={`Select row ${line.employeeId}`}
                        hideLabel
                        onChange={handleEmployeeCheckboxChange(
                          onSelectRow,
                          line.employeeId
                        )}
                        checked={line.isSelected}
                      />
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.employee}>
                      {line.name}
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.daysPaid}>
                      {line.daysPaid}
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.gross}>
                      {line.gross}
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.paye}>
                      {line.paye}
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.kiwiSaver}>
                      {line.kiwiSaver}
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.takeHomePay}>
                      {line.takeHomePay}
                    </Table.RowItem>
                  </Table.Row>
                }
              >
                <PayDetailsTable
                  employeeId={line.employeeId}
                  employeeName={line.name}
                  daysPaid={line.daysPaid}
                  onEmployeePayLineChange={onEmployeePayLineChange}
                  onEmployeePayLineBlur={onEmployeePayLineBlur}
                  onDaysPaidChange={onDaysPaidChange}
                />
              </Table.CollapsibleRow>
            ))}
            <Table.CollapsibleRow
              key="expansion-toggle-total"
              header={
                <Table.Row
                  key="total"
                  className={styles.totalRow}
                  testId="totals-row-test-id"
                >
                  <Table.RowItem
                    width="5rem"
                    cellRole="checkbox"
                    valign="middle"
                  />
                  <Table.RowItem {...tableConfig.employee}></Table.RowItem>
                  <Table.RowItem {...tableConfig.daysPaid}></Table.RowItem>
                  <Table.RowItem
                    {...tableConfig.gross}
                    testClass="totals-row-item-test-class"
                  >
                    {totals.gross}
                  </Table.RowItem>
                  <Table.RowItem
                    {...tableConfig.paye}
                    testClass="totals-row-item-test-class"
                  >
                    {totals.paye}
                  </Table.RowItem>
                  <Table.RowItem
                    {...tableConfig.kiwiSaver}
                    testClass="totals-row-item-test-class"
                  >
                    {totals.kiwiSaver}
                  </Table.RowItem>
                  <Table.RowItem
                    {...tableConfig.takeHomePay}
                    testClass="totals-row-item-test-class"
                  >
                    {totals.takeHomePay}
                  </Table.RowItem>
                </Table.Row>
              }
            >
              <></>
            </Table.CollapsibleRow>
          </Table.Body>
        }
      />
    </div>
  </Card>
);

const mapStateToProps = (state) => ({
  lines: getFormattedEmployeePayLines(state),
  isAllSelected: getIsAllSelected(state),
  isPartiallySelected: getIsPartiallySelected(state),
  totals: getTotals(state),
  numberOfSelected: getNumberOfSelected(state),
});

export default connect(mapStateToProps)(EmployeesPayTable);
