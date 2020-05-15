import {
  AccordionTable, Card, Checkbox, FieldGroup, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormattedEmployeePayLines,
  getIsAllSelected,
  getIsPartiallySelected,
  getNumberOfSelected,
  getTotals,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTable from './EmployeeRecalculatePayTable';
import EtpModalOpenButton from './EtpModalOpenButton';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import styles from './EmployeePayTable.module.css';

const tableConfig = {
  employee: { width: 'flex-2', columnName: 'Employee' },
  payg: { width: 'flex-1', columnName: 'Gross ($}', align: 'right' },
  gross: { width: 'flex-1', columnName: 'PAYG ($)', align: 'right' },
  deduction: { width: 'flex-1', columnName: 'Deductions ($)', align: 'right' },
  netPay: { width: 'flex-1', columnName: 'Net pay ($)', align: 'right' },
  super: { width: 'flex-1', columnName: 'Super ($)', align: 'right' },
};

const handleEmployeeCheckboxChange = (handler, id) => () => handler(id);

const EmployeePayTable = ({
  lines,
  isAllSelected,
  isPartiallySelected,
  totals,
  numberOfSelected,
  onSelectRow,
  onSelectAllRows,
  onOpenEtpModal,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onAddJob,
}) => (
    <Card>
      <div className={styles.employeePayTable}>
      <FieldGroup label="Select employees to pay">
        {`${numberOfSelected} employees selected`}
      </FieldGroup>
      <AccordionTable
        expansionToggle
        header={(
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
            <Table.HeaderItem {...tableConfig.employee}>Employee</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.gross}>
              Gross ($)
              <Tooltip>Gross includes all taxable and tax exempt income</Tooltip>
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.payg}>PAYG ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.deduction}>Deductions ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.netPay}>
              Net pay ($)
              <Tooltip>This is your employees&apos; take home pay</Tooltip>
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.super}>
              Super ($)
              <Tooltip>Super includes all super deductions and super expenses</Tooltip>
            </Table.HeaderItem>
          </Table.Header>
        )}
        body={(
          <Table.Body>
            {lines.map(line => (
              <Table.CollapsibleRow
                key={`expansion-toggle-${line.employeeId}`}
                header={(
                  <Table.Row key={line.employeeId}>
                    <Table.RowItem width="5rem">
                      <Checkbox
                        name={`${line.employeeId}-select`}
                        label={`Select row ${line.employeeId}`}
                        hideLabel
                        onChange={handleEmployeeCheckboxChange(onSelectRow, line.employeeId)}
                        checked={line.isSelected}
                      />
                    </Table.RowItem>
                    <Table.RowItem {...tableConfig.employee}>{line.name}</Table.RowItem>
                    <Table.RowItem {...tableConfig.gross}>{line.gross}</Table.RowItem>
                    <Table.RowItem {...tableConfig.payg}>{line.payg}</Table.RowItem>
                    <Table.RowItem {...tableConfig.deduction}>{line.deduction}</Table.RowItem>
                    <Table.RowItem {...tableConfig.netPay}>{line.netPay}</Table.RowItem>
                    <Table.RowItem {...tableConfig.super}>{line.super}</Table.RowItem>
                  </Table.Row>
                )}
              >
                <EtpModalOpenButton line={line} onOpenEtpModal={onOpenEtpModal} />
                <EmployeeRecalculatePayTable
                  employeeId={line.employeeId}
                  employeeName={line.name}
                  onEmployeePayItemChange={onEmployeePayItemChange}
                  onEmployeePayItemBlur={onEmployeePayItemBlur}
                  onAddJob={onAddJob}
                />
              </Table.CollapsibleRow>
            ))}
            <Table.CollapsibleRow
              key="expansion-toggle-total"
              header={(
                <Table.Row key="total" className={styles.totalRow}>
                  <Table.RowItem width="5rem" cellRole="checkbox" valign="middle" />
                  <Table.RowItem {...tableConfig.employee}></Table.RowItem>
                  <Table.RowItem {...tableConfig.gross}>{totals.gross}</Table.RowItem>
                  <Table.RowItem {...tableConfig.payg}>{totals.payg}</Table.RowItem>
                  <Table.RowItem {...tableConfig.deduction}>{totals.deduction}</Table.RowItem>
                  <Table.RowItem {...tableConfig.netPay}>{totals.netPay}</Table.RowItem>
                  <Table.RowItem {...tableConfig.super}>{totals.super}</Table.RowItem>
                </Table.Row>
              )}
            />
          </Table.Body>
        )}
      />
      </div>
    </Card>
);

const mapStateToProps = state => ({
  lines: getFormattedEmployeePayLines(state),
  isAllSelected: getIsAllSelected(state),
  isPartiallySelected: getIsPartiallySelected(state),
  totals: getTotals(state),
  numberOfSelected: getNumberOfSelected(state),
});

export default connect(mapStateToProps)(EmployeePayTable);
