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
  employeeName: {
    columnName: 'Employee', width: 'flex-1', valign: 'middle',
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
      <Table.HeaderItem {...tableConfig.employeeName}>
        {tableConfig.employeeName.columnName}
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

  const rows = employees.map(row => (
    <Table.Row key={row.id}>
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={`${row.id}-select`}
          label={`Select row ${row.id}`}
          hideLabel
          onChange={e => selectItem(row, e.target.checked)}
          checked={row.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeName}>
        {row.name}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.terminationDate}>
        {row.terminationDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.grossPaymentYtd}>
        {row.ytdGross}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.paygWithholdingYtd}>
        {row.ytdTax}
      </Table.RowItem>
      {isRFBAEnabled
        && <>
          <Table.RowItem {...tableConfig.rfba}>
            {row.isFinalised
              ? row.rfbAmount
              : (
                <AmountInput
                  textAlign="right"
                  label="rfbAmount"
                  name="rfbAmount"
                  hideLabel
                  value={row.rfbAmount}
                  onChange={handleAmountInputChange(({ key, value }) => onEmployeeChange({
                    key, value, rowId: row.id,
                  }))}
                />
              )
            }
          </Table.RowItem>
          <Table.RowItem {...tableConfig.section57a}>
            {row.isFinalised
              ? row.s57aRfbAmount
              : (
                <AmountInput
                  textAlign="right"
                  label="s57aRfbAmount"
                  name="s57aRfbAmount"
                  hideLabel
                  value={row.s57aRfbAmount}
                  onChange={handleAmountInputChange(({ key, value }) => onEmployeeChange({
                    key, value, rowId: row.id,
                  }))}
                />
              )
            }
          </Table.RowItem>
        </>
      }
      <Table.RowItem {...tableConfig.isFinalised}>
        {row.isFinalised && <Icons.Tick />}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.moreOptions}>
        <Dropdown
          right
          items={[
            <Dropdown.Item key="billLink" label="View summary report (PDF)" value={row.id} />,
          ]}
          onSelect={() => {}}
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
