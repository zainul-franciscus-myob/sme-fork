import {
  Button,
  Checkbox,
  HeaderSort,
  Separator,
  Table,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../components/TableView/TableView';

const ElectronicPaymentsTable = ({
  isTableLoading,
  onSort,
  order,
  selectAll,
  selectItem,
  electronicPayments,
  onReferenceNumberClick,
  renderCheckbox,
}) => {
  const selectedCount = electronicPayments.filter(e => e.isSelected).length;

  const bulkActions = (
    <>
      <p style={{ margin: '1.6rem' }}>
        {selectedCount > 1
          ? `${selectedCount} items selected`
          : `${selectedCount} item selected`}
      </p>
    </>
  );

  const header = (
    <Table.Header>
      {renderCheckbox && (
        <Table.HeaderItem width="3.5rem">
          <Checkbox
            name="bulk-select"
            label="Bulk select"
            hideLabel
            onChange={e => selectAll(e.target.checked)}
            checked={
              electronicPayments.length !== 0 && selectedCount === electronicPayments.length
            }
            indeterminate={
              selectedCount > 0 && selectedCount !== electronicPayments.length
            }
          />
        </Table.HeaderItem>
      )}
      <Table.HeaderItem>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Name" sortName="ContactName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Payment type" sortName="ElectronicPaymentTypeName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem align="right">
        <HeaderSort title=" Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = electronicPayments.map(row => (
    <Table.Row key={row.id}>
      {renderCheckbox && (
        <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
          <Checkbox
            name={`${row.id}-select`}
            label={`Select row ${row.id}`}
            hideLabel
            onChange={e => selectItem(row, e.target.checked)}
            checked={row.isSelected}
          />
        </Table.RowItem>
      )}
      <Table.RowItem columnName="Date">{row.date}</Table.RowItem>
      <Table.RowItem columnName="Reference number">
        <Button
          type="link"
          onClick={() => { onReferenceNumberClick(row.referenceNumber, row.name); }}
        >
          {row.referenceNumber}
        </Button>
      </Table.RowItem>
      <Table.RowItem columnName="Name">{row.name}</Table.RowItem>
      <Table.RowItem columnName="Payment type">{row.paymentTypeDisplay}</Table.RowItem>
      <Table.RowItem align="right" columnName="Amount">{row.amount}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <Separator />
      {(selectedCount !== 0) && bulkActions}
      <TableView
        header={header}
        isEmpty={electronicPayments.length === 0}
        emptyMessage="No transactions found."
        isLoading={isTableLoading}
      >
        <Table.Body>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );
};

export default ElectronicPaymentsTable;
