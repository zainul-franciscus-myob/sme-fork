import { Checkbox, Table } from '@myob/myob-widgets';
import React from 'react';

import AccordionTable from '../../../../../components/Feelix/Accordion/AccordionTable';
import PayItemsTable from './PayItemsTable';
import styles from './PaysTable.module.css';

const tableConfig = {
  isSelected: {
    columnName: '', width: 'auto', cellRole: 'checkbox', valign: 'middle',
  },
  payPeriod: {
    columnName: 'Pay period', width: 'flex-2', valign: 'middle',
  },
  paymentDate: {
    columnName: 'Date of payment', width: 'flex-2', valign: 'middle',
  },
};

const PaysTable = ({
  pays,
  selectedStatus,
  onSelectAll,
  onRowSelect,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.isSelected} className={styles.checkbox}>
        <Checkbox
          name="selectAll"
          label="selectAll"
          hideLabel
          onChange={e => onSelectAll(e.target.checked)}
          checked={selectedStatus === 'checked'}
          indeterminate={selectedStatus === 'indeterminate'}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paymentDate}>
        {tableConfig.paymentDate.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const body = (
    <Table.Body>
      {pays.map(row => (
        <Table.CollapsibleRow
          key={`row-${row.id}`}
          header={(
            <Table.Row key={row.id}>
              <Table.RowItem {...tableConfig.isSelected}>
                <Checkbox
                  name={`${row.id}-select`}
                  label={`Select row ${row.id}`}
                  hideLabel
                  onChange={e => onRowSelect(row, e.target.checked)}
                  checked={row.isSelected}
                />
              </Table.RowItem>
              <Table.RowItem {...tableConfig.payPeriod}>
                {row.payPeriod}
              </Table.RowItem>
              <Table.RowItem {...tableConfig.paymentDate}>
                {row.paymentDate}
              </Table.RowItem>
            </Table.Row>
          )}
        >
          <PayItemsTable payItems={row.payItems} />
        </Table.CollapsibleRow>
      ))}
    </Table.Body>
  );


  return <AccordionTable header={header} body={body} expansionToggle />;
};

export default PaysTable;
