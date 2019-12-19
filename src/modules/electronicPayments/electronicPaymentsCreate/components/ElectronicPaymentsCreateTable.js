import {
  Checkbox,
  HeaderSort,
  Separator,
  Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../components/TableView/TableView';
import styles from './ElectronicPaymentsCreateTable.module.css';

const ElectronicPaymentsCreateTable = ({
  isTableLoading,
  onSort,
  order,
  selectAll,
  selectItem,
  transactions,
}) => {
  const getRefEntryLink = row => (row.link ? (
    <a href={row.link}>{row.referenceNumber}</a>
  ) : (
    <Tooltip placement="bottom" triggerContent={row.referenceNumber}>
      This transaction type can only be viewed and edited from your desktop AccountRight software
    </Tooltip>
  ));

  const selectedCount = transactions.filter(e => e.isSelected).length;

  const bulkActions = (
    <>
      <p className={styles.bulkActions}>
        {selectedCount > 1 ? `${selectedCount} items selected` : `${selectedCount} item selected`}
      </p>
    </>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem width="3.5rem">
        <Checkbox
          name="bulk-select"
          label="Bulk select"
          hideLabel
          onChange={e => selectAll(e.target.checked)}
          checked={transactions.length !== 0 && selectedCount === transactions.length}
          indeterminate={selectedCount > 0 && selectedCount !== transactions.length}
        />
      </Table.HeaderItem>
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

  const rows = transactions.map(row => (
    <Table.Row key={row.id}>
      <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
        <Checkbox
          name={`${row.id}-select`}
          label={`Select row ${row.id}`}
          hideLabel
          onChange={e => selectItem(row, e.target.checked)}
          checked={row.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem columnName="Date">
        {row.date}
      </Table.RowItem>
      <Table.RowItem columnName="Reference number">
        {getRefEntryLink(row)}
      </Table.RowItem>
      <Table.RowItem columnName="Name">
        {row.name}
      </Table.RowItem>
      <Table.RowItem columnName="Payment type">
        {row.paymentTypeDisplay}
      </Table.RowItem>
      <Table.RowItem align="right" columnName="Amount">
        {row.amount}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <Separator />
      {(selectedCount !== 0) && bulkActions}
      <TableView
        header={header}
        isEmpty={transactions.length === 0}
        emptyMessage="No transactions found."
        isLoading={isTableLoading}
      >
        <Table.Body onRowSelect={() => {}}>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );
};

export default ElectronicPaymentsCreateTable;
