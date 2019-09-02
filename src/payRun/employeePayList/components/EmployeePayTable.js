import {
  AccordionTable, Checkbox, FieldGroup, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormattedEmployeePayLines,
  getIsAllSelected,
  getIsPartiallySelected, getNumberOfSelected, getTotals,
} from '../EmployeePayListSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import styles from './EmployeePayTable.module.css';

const netPayTooltip = <Tooltip>This is your employees&apos; take home pay</Tooltip>;

const tableConfig = {
  employee: { width: 'flex-1', columnName: 'Employee' },
  payg: { width: '10.8rem', columnName: 'Gross ($}', align: 'right' },
  gross: { width: '10.8rem', columnName: 'PAYG ($)', align: 'right' },
  deduction: { width: '16.8rem', columnName: 'Deductions ($)', align: 'right' },
  netPay: { width: '16.8rem', columnName: 'Net pay ($)', align: 'right' },
  super: { width: '16.8rem', columnName: 'Super ($)', align: 'right' },
};

const handleEmployeeCheckboxChange = (handler, id) => () => handler(id);

const AccordionContent = 'Accordion content goes here...';

const EmployeePayTable = ({
  lines,
  isAllSelected,
  isPartiallySelected,
  totals,
  numberOfSelected,
  onSelectRow,
  onSelectAllRows,
}) => (
  <div className={styles.employeePayTable}>
    <FormCard>
      <FieldGroup label="Select employees to pay">
        {`${numberOfSelected} employees selected`}
      </FieldGroup>
      <AccordionTable
        expansionToggle
        header={(
          <Table.Header>
            <Table.HeaderItem width="auto">
              <Checkbox
                name="bulk-select"
                label="Bulk select"
                hideLabel
                onChange={handleCheckboxChange(onSelectAllRows)}
                checked={isAllSelected}
                indeterminate={isPartiallySelected}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.employee}>Employee</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.gross}>Gross ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.payg}>PAYG ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.deduction}>Deductions ($)</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.netPay}>
              Net pay ($)
              {netPayTooltip}
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.super}>Super ($)</Table.HeaderItem>
          </Table.Header>
        )}
        body={(
          <Table.Body>
            {lines.map(line => (
              <Table.CollapsibleRow
                key={`expansion-toggle-${line.employeeId}`}
                header={(
                  <Table.Row key={line.employeeId}>
                    <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
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
                {AccordionContent}
              </Table.CollapsibleRow>
            ))}
            <Table.CollapsibleRow
              key="expansion-toggle-total"
              header={(
                <Table.Row key="total">
                  <Table.RowItem width="auto" cellRole="checkbox" valign="middle" />
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
    </FormCard>
  </div>
);

const mapStateToProps = state => ({
  lines: getFormattedEmployeePayLines(state),
  isAllSelected: getIsAllSelected(state),
  isPartiallySelected: getIsPartiallySelected(state),
  totals: getTotals(state),
  numberOfSelected: getNumberOfSelected(state),
});

export default connect(mapStateToProps)(EmployeePayTable);
