import {
  Button, Checkbox, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getBankEntryByIndexSelector } from '../bankingSelectors';
import { getIsBulkLoading } from '../bankingSelectors/bulkAllocationSelectors';
import MatchedOrAllocated from './MatchedOrAllocated';
import styles from './BankTransactionTable.module.css';

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const onClickChevronButton = (handler, index) => () => handler(index);

const BankingTableRowField = ({ title, children, className }) => (
  <div className={className}>
    <span className={styles.label}>
      <strong>
        {title}
      </strong>
    </span>
    {children}
  </div>
);

const BankingTableDescription = ({
  isExpanded, description, note, className,
}) => (
  <div className={className}>
    {description}
    {note && (
      <div className={classNames(styles.note, { [styles.openedNote]: isExpanded })}>
        Note:
        {' '}
        {note}
      </div>
    )}
  </div>
);

const BankTransactionTableRow = ({
  index,
  entry,
  onHeaderClick,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onAllocate,
  onUnallocate,
  onMatchedToBlur,
  onMatchedToFocus,
  onUnmatchedFocus,
  onUnmatchedBlur,
  isExpanded,
  isSelected,
  isBulkLoading,
  onSelectTransaction,
  children,
}) => {
  const matchedOrAllocatedRowItem = (
    <MatchedOrAllocated
      entry={entry}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onAllocate={onAllocate}
      onUnallocate={onUnallocate}
      onMatchedToBlur={onMatchedToBlur}
      onMatchedToFocus={onMatchedToFocus}
      onUnmatchedFocus={onUnmatchedFocus}
      onUnmatchedBlur={onUnmatchedBlur}
      index={index}
      isExpanded={isExpanded}
    />
  );

  const expandIcon = isExpanded ? <Icons.UpChevron /> : <Icons.DownChevron />;

  const amount = entry.deposit ? `$${entry.deposit}` : `-$${entry.withdrawal}`;

  const desktopInfoColumn = (
    <div className={styles.infoColumn}>
      <BankingTableRowField title="Date:" className={styles.date}>
        {entry.displayDate}
      </BankingTableRowField>
      <div className={styles.description}>
        <BankingTableDescription
          isExpanded={isExpanded}
          description={entry.description}
          note={entry.note}
        />
        <BankingTableRowField title="Withdrawal" className={styles.withdrawalOrDeposit}>
          {entry.withdrawal}
        </BankingTableRowField>
        <BankingTableRowField title="Deposit" className={styles.withdrawalOrDeposit}>
          {entry.deposit}
        </BankingTableRowField>
      </div>
    </div>
  );

  const mobileInfoColumn = (
    <div className={styles.mobileInfoColumn}>
      <BankingTableDescription
        className={styles.mobileDescription}
        isExpanded={isExpanded}
        description={entry.description}
        note={entry.note}
      />
      <div className={styles.description}>
        <BankingTableRowField className={styles.date}>
          {entry.displayDate}
        </BankingTableRowField>
        <BankingTableRowField className={styles.amount}>
          {amount}
        </BankingTableRowField>
      </div>
    </div>
  );

  const tableRowClassName = classNames(
    styles.row,
    {
      [styles.expanded]: isExpanded,
      [styles.selected]: isSelected,
    },
  );

  const columnsClassName = classNames(
    styles.columns,
    {
      [styles.expandedHeader]: isExpanded,
    },
  );

  return (
    <div className={tableRowClassName}>
      <div className={columnsClassName}>
        <div className={styles.selectionColumn}>
          <Checkbox
            name={`${index}-select`}
            label={`Select row ${index}`}
            hideLabel
            onChange={onCheckboxChange(onSelectTransaction, index)}
            checked={entry.selected}
            disabled={isBulkLoading}
          />
        </div>
        { mobileInfoColumn }
        { desktopInfoColumn }
        <div className={styles.allocationColumn}>
          {matchedOrAllocatedRowItem}
          <div className={styles.taxCode}>{entry.taxCode}</div>
          <div className={styles.action}>
            <Button type="secondary" size="xs" onClick={onClickChevronButton(onHeaderClick, index)}>
              {expandIcon}
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const makeMapRowStateToProps = () => {
  const getBankEntryByIndex = getBankEntryByIndexSelector();
  return (state, ownProps) => ({
    isBulkLoading: getIsBulkLoading(state),
    entry: getBankEntryByIndex(state, ownProps),
  });
};

export default connect(makeMapRowStateToProps)(BankTransactionTableRow);
