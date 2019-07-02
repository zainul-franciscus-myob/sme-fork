import {
  Checkbox, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankEntryByIndexSelector } from '../bankingSelectors';
import { getIsBulkLoading } from '../bankingSelectors/bulkAllocationSelectors';
import AllocatedRowItem from './AllocatedRowItem';
import ExpandedRowItem from './ExpandedRowItem';
import MatchedRowItem from './MatchedRowItem';
import SplitRowItem from './SplitRowItem';
import UnmatchedRowItem from './UnmatchedRowItem';
import style from './BankingView.css';

const getMatchedOrAllocatedRowItem = ({
  entry,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onMatchedToFocus,
  onMatchedToBlur,
  onUnmatchedBlur,
  onUnmatchedFocus,
  onAllocate,
  onUnallocate,
  tableConfig,
  index,
  isExpanded,
}) => {
  const {
    type,
    isLoading,
  } = entry;

  if (isLoading) {
    return (
      <Table.RowItem {...tableConfig.allocateOrMatch}>
        <Spinner size="small" />
      </Table.RowItem>
    );
  }

  if (isExpanded) {
    return (
      <ExpandedRowItem
        entry={entry}
        {...tableConfig.allocateOrMatch}
      />
    );
  }

  if (type === 'matched') {
    return (
      <MatchedRowItem
        entry={entry}
        onClick={() => onMatchRowItemClick(index)}
        {...tableConfig.allocateOrMatch}
      />
    );
  }

  if (type === 'splitAllocation' || type === 'payment' || type === 'transfer') {
    return (
      <SplitRowItem
        index={index}
        entry={entry}
        onClick={() => onSplitRowItemClick(index)}
        {...tableConfig.allocateOrMatch}
      />
    );
  }

  if (type === 'singleAllocation') {
    return (
      <AllocatedRowItem
        {...tableConfig.allocateOrMatch}
        entry={entry}
        onUnallocate={() => onUnallocate(index)}
        onAllocate={item => onAllocate(index, item)}
        onFocus={() => onMatchedToFocus(index)}
        onBlur={() => onMatchedToBlur(index)}
      />
    );
  }

  return (
    <UnmatchedRowItem
      {...tableConfig.allocateOrMatch}
      entry={entry}
      onAllocate={item => onAllocate(index, item)}
      onFocus={() => onUnmatchedFocus(index)}
      onBlur={() => onUnmatchedBlur(index)}
    />
  );
};

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const BankTransactionTableRow = ({
  index,
  entry,
  onSplitRowItemClick,
  onMatchRowItemClick,
  tableConfig,
  onAllocate,
  onUnallocate,
  onMatchedToBlur,
  onMatchedToFocus,
  onUnmatchedFocus,
  onUnmatchedBlur,
  isExpanded,
  isBulkLoading,
  onSelectTransaction,
}) => {
  const matchedOrAllocatedRowItem = getMatchedOrAllocatedRowItem({
    entry,
    onSplitRowItemClick,
    onMatchRowItemClick,
    tableConfig,
    onAllocate,
    onUnallocate,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
    onUnmatchedBlur,
    index,
    isExpanded,
  });

  return (
    <React.Fragment>
      <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
        <Checkbox
          name={`${index}-select`}
          label={`Select row ${index}`}
          hideLabel
          onChange={onCheckboxChange(onSelectTransaction, index)}
          checked={entry.selected}
          disabled={isBulkLoading}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        <div className={style.ellipsisText} title={entry.description}>
          {entry.description}
        </div>
        {entry.note
        && (<div className={style.ellipsisText} title={entry.note}>{entry.note}</div>)
        }
      </Table.RowItem>
      <Table.RowItem {...tableConfig.withdrawal}>{entry.withdrawal}</Table.RowItem>
      <Table.RowItem {...tableConfig.deposit}>{entry.deposit}</Table.RowItem>
      {matchedOrAllocatedRowItem}
      <Table.RowItem {...tableConfig.taxCode}>{entry.taxCode}</Table.RowItem>
    </React.Fragment>
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
