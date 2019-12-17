import {
  Checkbox, Table,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './BankReconciliationTable.module.css';

const BankReconciliationTableRow = ({
  tableConfig,
  index,
  entry,
  isActionDisabled,
  onCheckboxChange,
  onSelectRow,
}) => (
  <Table.Row
    key={entry.journalLineId}
    isSelected={entry.isChecked}
    className={styles.tableRowToggle}
  >
    <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
      <Checkbox
        name={entry.journalLineId}
        label={entry.journalLineId}
        hideLabel
        onChange={onCheckboxChange(onSelectRow, index)}
        checked={entry.isChecked}
        disabled={isActionDisabled}
      />
    </Table.RowItem>
    <Table.RowItem {...tableConfig.date}>
      {entry.date}
    </Table.RowItem>
    <Table.RowItem {...tableConfig.reference}>
      <a href={entry.link}>{entry.referenceId}</a>
    </Table.RowItem>
    <Table.RowItem {...tableConfig.description}>
      {entry.description}
    </Table.RowItem>
    <Table.RowItem {...tableConfig.withdrawal}>
      {entry.withdrawal}
    </Table.RowItem>
    <Table.RowItem {...tableConfig.deposit}>
      {entry.deposit}
    </Table.RowItem>
  </Table.Row>
);

export default BankReconciliationTableRow;
