import {
  Checkbox, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import TableCollapsibleRow from '../../../components/Feelix/Accordion/TableCollapsibleRow';
import styles from './BankReconciliationTable.module.css';

const BankReconciliationTableCollapsibleRow = ({
  tableConfig,
  index,
  entry,
  isActionDisabled,
  onCheckboxChange,
  onSelectRow,
}) => (
  <TableCollapsibleRow
    header={(
      <Table.Row
        key={entry.journalLineId}
        isSelected={entry.isChecked}
        className={styles.showToggle}
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
        <Table.RowItem {...tableConfig.reference} />
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
    )}
  >
    {
      entry.matchedTransactions.map((matchedTransactionEntry) => {
        const getRefEntryLink = (matchedTransactionEntry.link ? (
          <a href={matchedTransactionEntry.link}>{matchedTransactionEntry.referenceId}</a>
        ) : (
          <Tooltip placement="bottom" triggerContent={matchedTransactionEntry.referenceId}>
              This transaction type can only be viewed and edited from your desktop AccountRight
              software
          </Tooltip>
        ));

        return (
          <Table.Row
            key={matchedTransactionEntry.journalLineId}
            isSelected={matchedTransactionEntry.isChecked}
            className={styles.collapsibleTableRowContent}
          >
            <Table.RowItem width="auto" cellRole="checkbox" valign="middle" />
            <Table.RowItem {...tableConfig.date}>
              {matchedTransactionEntry.date}
            </Table.RowItem>
            <Table.RowItem {...tableConfig.reference}>
              {getRefEntryLink}
              <a href={matchedTransactionEntry.link}>{matchedTransactionEntry.referenceId}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.description}>
              {matchedTransactionEntry.description}
            </Table.RowItem>
            <Table.RowItem {...tableConfig.withdrawal}>
              {matchedTransactionEntry.withdrawal}
            </Table.RowItem>
            <Table.RowItem {...tableConfig.deposit}>
              {matchedTransactionEntry.deposit}
            </Table.RowItem>
          </Table.Row>
        );
      })
    }
  </TableCollapsibleRow>
);

export default BankReconciliationTableCollapsibleRow;
