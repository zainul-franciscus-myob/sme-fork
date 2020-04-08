import {
  BulkActions, Button, Checkbox, Dropdown, Icons, Table,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import TableView from '../../../../../components/TableView/TableView';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';

const tableConfig = {
  checkbox: {
    columnName: '', width: 'auto', cellRole: 'checkbox', valign: 'middle',
  },
  employeeFirstName: {
    columnName: 'First name', width: 'flex-1', valign: 'middle',
  },
  employeeLastName: {
    columnName: 'Last name', width: 'flex-1', valign: 'middle',
  },
  terminationDate: {
    columnName: 'Employment end date', width: 'flex-1', valign: 'middle', textWrap: 'wrap',
  },
  grossPaymentYtd: {
    columnName: 'Gross YTD ($)', width: 'flex-1', valign: 'middle', align: 'right',
  },
  paygWithholdingYtd: {
    columnName: 'PAYG withholding YTD ($)', width: 'flex-1', valign: 'middle', align: 'right',
  },
  rfba: {
    columnName: 'RFBA ($)', width: 'flex-1', align: 'right',
  },
  section57a: {
    columnName: 'Section 57A ($)', width: 'flex-1', align: 'right',
  },
  isFinalised: {
    columnName: 'Final indicator', width: 'flex-1', valign: 'middle', align: 'left',
  },
  moreOptions: {
    columnName: '', width: 'auto', cellRole: 'actions',
  },
};

const FinalisationEmployeesTable = ({
  employees,
  isTableLoading,
  selectAll,
  selectItem,
  isRFBAEnabled,
  onEmployeeChange,
  shouldShowFinaliseButton,
  shouldShowRemoveFinalisationButton,
  onFinaliseClick,
  onRemoveFinalisationClick,
  onEmployeeSummaryReportClick,
}) => {
  const selectedCount = employees.filter(e => e.isSelected).length;

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="bulk-select"
          label="Bulk select"
          hideLabel
          onChange={e => selectAll(e.target.checked)}
          checked={
              employees.length !== 0 && selectedCount === employees.length
            }
          indeterminate={
              selectedCount > 0 && selectedCount !== employees.length
            }
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeFirstName}>
        {tableConfig.employeeFirstName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeLastName}>
        {tableConfig.employeeLastName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.terminationDate}>
        {tableConfig.terminationDate.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.grossPaymentYtd}>
        {tableConfig.grossPaymentYtd.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paygWithholdingYtd}>
        {tableConfig.paygWithholdingYtd.columnName}
      </Table.HeaderItem>
      {isRFBAEnabled
        && <>
          <Table.HeaderItem {...tableConfig.rfba}>
            {tableConfig.rfba.columnName}
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.section57a}>
            {tableConfig.section57a.columnName}
          </Table.HeaderItem>
        </>
      }
      <Table.HeaderItem {...tableConfig.isFinalised}>
        {tableConfig.isFinalised.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.moreOptions}>
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map(employee => (
    <Table.Row key={employee.id}>
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={`${employee.id}-select`}
          label={`Select row ${employee.id}`}
          hideLabel
          onChange={e => selectItem(employee, e.target.checked)}
          checked={employee.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeFirstName}>
        {employee.firstName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeLastName}>
        {employee.lastName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.terminationDate}>
        {employee.terminationDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.grossPaymentYtd}>
        {employee.ytdGross}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.paygWithholdingYtd}>
        {employee.ytdTax}
      </Table.RowItem>
      {isRFBAEnabled
        && <>
          <Table.RowItem {...tableConfig.rfba}>
            {employee.isFinalised
              ? employee.rfbAmount
              : (
                <AmountInput
                  textAlign="right"
                  label="rfbAmount"
                  name="rfbAmount"
                  hideLabel
                  value={employee.rfbAmount}
                  onChange={handleAmountInputChange(({ key, value }) => onEmployeeChange({
                    key, value, rowId: employee.id,
                  }))}
                />
              )
            }
          </Table.RowItem>
          <Table.RowItem {...tableConfig.section57a}>
            {employee.isFinalised
              ? employee.s57aRfbAmount
              : (
                <AmountInput
                  textAlign="right"
                  label="s57aRfbAmount"
                  name="s57aRfbAmount"
                  hideLabel
                  value={employee.s57aRfbAmount}
                  onChange={handleAmountInputChange(({ key, value }) => onEmployeeChange({
                    key, value, rowId: employee.id,
                  }))}
                />
              )
            }
          </Table.RowItem>
        </>
      }
      <Table.RowItem {...tableConfig.isFinalised}>
        {employee.isFinalised && <Icons.Tick />}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.moreOptions}>
        <Dropdown
          right
          items={[
            <Dropdown.Item
              key="employeeSummaryReport"
              label="View summary report (PDF)"
              value={employee.id}
            />,
          ]}
          onSelect={onEmployeeSummaryReportClick}
          toggle={(
            <Dropdown.Toggle size="xs">
              <Icons.More />
            </Dropdown.Toggle>
            )}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <>
      <BulkActions>
        {shouldShowFinaliseButton
        && (
          <Button
            testid="finaliseButton"
            type="secondary"
            onClick={onFinaliseClick}
          >
              Finalise and notify the ATO
          </Button>
        )}
        {shouldShowRemoveFinalisationButton && (
          <Button
            testid="removeFinalisationButton"
            type="secondary"
            onClick={onRemoveFinalisationClick}
          >
            Remove finalisation and notify the ATO
          </Button>
        )}
      </BulkActions>
      <TableView
        header={header}
        isLoading={isTableLoading}
        isEmpty={employees.length === 0}
        testid="finalisationEmployeesTable"
      >
        <Table.Body>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );

  return table;
};

export default FinalisationEmployeesTable;
