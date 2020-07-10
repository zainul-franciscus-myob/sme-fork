import { Checkbox, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getJournalLineIdByIndexSelector,
  getTableRowByIndexSelector,
} from '../BankReconciliationSelectors';
import AccordionRowTypes from '../../../components/Accordion/AccordionRowTypes';
import CollapsibleTableRow from '../../../components/Accordion/CollapsibleTableRow';
import styles from './BankReconciliationTable.module.css';

const BankReconciliationTableRow = ({
  entry,
  journalLineId,
  index,
  buildRowProps,
  tableConfig,
  isActionDisabled,
  onCheckboxChange,
  onSelectRow,
}) => {
  const rowType = entry.hasMatchedTransactions
    ? AccordionRowTypes.COLLAPSIBLE
    : AccordionRowTypes.NORMAL;

  const getRefEntryLink = entry.link ? (
    <a href={entry.link} target="_blank" rel="noopener noreferrer">
      {entry.referenceId}
    </a>
  ) : (
    <Tooltip placement="bottom" triggerContent={entry.referenceId}>
      This transaction type can only be viewed and edited from your desktop
      AccountRight software
    </Tooltip>
  );

  const headerReference =
    rowType === AccordionRowTypes.COLLAPSIBLE ? (
      <Table.RowItem {...tableConfig.reference} />
    ) : (
      <Table.RowItem {...tableConfig.reference}>
        {getRefEntryLink}
      </Table.RowItem>
    );

  const header = (
    <>
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
      <Table.RowItem {...tableConfig.date}>{entry.date}</Table.RowItem>
      {headerReference}
      <Table.RowItem {...tableConfig.description}>
        {entry.description}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.withdrawal}>
        {entry.withdrawal}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.deposit}>{entry.deposit}</Table.RowItem>
    </>
  );

  const rowProps = buildRowProps({
    id: journalLineId,
    isSelected: entry.isChecked,
    rowType,
    index,
    header,
  });

  return (
    <CollapsibleTableRow {...rowProps}>
      {entry.matchedTransactions.map((matchedTransactionEntry) => {
        const getRefMatchedTransactionLink = matchedTransactionEntry.link ? (
          <a href={matchedTransactionEntry.link}>
            {matchedTransactionEntry.referenceId}
          </a>
        ) : (
          <Tooltip
            placement="bottom"
            triggerContent={matchedTransactionEntry.referenceId}
          >
            This transaction type can only be viewed and edited from your
            desktop AccountRight software
          </Tooltip>
        );

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
              {getRefMatchedTransactionLink}
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
      })}
    </CollapsibleTableRow>
  );
};

const mapStateToProps = () => {
  const getTableRowByIndex = getTableRowByIndexSelector();
  const getJournalLineIdByIndex = getJournalLineIdByIndexSelector();
  return (state, props) => ({
    entry: getTableRowByIndex(state, props),
    journalLineId: getJournalLineIdByIndex(state, props),
  });
};

export default connect(mapStateToProps)(BankReconciliationTableRow);
