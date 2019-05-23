import { PropTypes } from 'prop-types';
import {
  Spinner, Table,
} from '@myob/myob-widgets';
import React from 'react';

import { tabIds } from '../tabItems';
import AllocatedRowItem from './AllocatedRowItem';
import BankTransactionTabs from './BankTransactionTabs';
import ExpandedRowItem from './ExpandedRowItem';
import MatchTransactionBody from './MatchTransactionBody';
import MatchedRowItem from './MatchedRowItem';
import OpenEntryFooter from './OpenEntryFooter';
import SplitAllocationBody from './SplitAllocationBody';
import SplitRowItem from './SplitRowItem';
import TableCollapsibleRow from '../../components/Feelix/Accordion/TableCollapsibleRow';
import UnmatchedRowItem from './UnmatchedRowItem';
import style from './BankingView.css';

/* eslint-disable react/no-array-index-key */

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

  if (type === 'splitAllocation') {
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

const BankTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    isOpenEntryLoading,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
    onUnmatchedBlur,
    onUnallocate,
    onAllocate,
    openPosition,
    activeTabId,
    onTabChange,
    onSaveSplitAllocation,
    onCancelSplitAllocation,
    onUnallocateSplitAllocation,
    onUpdateSplitAllocationHeader,
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
    onApplyMatchTransactionOptions,
    onUpdateMatchTransactionOptions,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
    onSaveMatchTransaction,
    onCancelMatchTransaction,
    onUnmatchTransaction,
  } = props;

  const spinner = (
    <div className={style.spinner}>
      <Spinner size="medium" />
    </div>
  );

  const Content = {
    [tabIds.allocate]: SplitAllocationBody,
    [tabIds.match]: MatchTransactionBody,
  }[activeTabId];

  const contentProps = {
    [tabIds.allocate]: {
      onUpdateSplitAllocationHeader,
      onAddSplitAllocationLine,
      onUpdateSplitAllocationLine,
      onDeleteSplitAllocationLine,
    },
    [tabIds.match]: {
      onApplyMatchTransactionOptions,
      onUpdateMatchTransactionOptions,
      onSortMatchTransactions,
      onUpdateMatchTransactionSelection,
    },
  }[activeTabId];

  const footerProps = {
    [tabIds.allocate]: {
      onSave: onSaveSplitAllocation,
      onCancel: onCancelSplitAllocation,
      onUnmatch: onUnallocateSplitAllocation,
    },
    [tabIds.match]: {
      onSave: onSaveMatchTransaction,
      onCancel: onCancelMatchTransaction,
      onUnmatch: onUnmatchTransaction,
    },
  }[activeTabId];

  const openEntry = (
    <React.Fragment>
      <BankTransactionTabs
        selected={activeTabId}
        onSelected={onTabChange}
      />
      <Content {...contentProps} />
    </React.Fragment>
  );

  const rows = entries.map((entry, index) => {
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
      isExpanded: index === openPosition,
    });

    return (
      <TableCollapsibleRow
        key={index}
        headerClickDisabled={entry.isLineDisabled}
        expansionToggle
        footer={!isOpenEntryLoading && <OpenEntryFooter {...footerProps} />}
        header={(
          <Table.Row key={index}>
            <Table.RowItem {...tableConfig.date}>
              {entry.displayDate}
            </Table.RowItem>
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
          </Table.Row>
          )}
      >
        {openPosition === index
          && (
          <div className={style.openEntry}>
            { isOpenEntryLoading ? spinner : openEntry }
          </div>
          )}
      </TableCollapsibleRow>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

BankTransactionTableBody.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tableConfig: PropTypes.shape({}).isRequired,
  openPosition: PropTypes.number.isRequired,
  isOpenEntryLoading: PropTypes.bool.isRequired,
  activeTabId: PropTypes.bool.isRequired,
  onAllocate: PropTypes.func.isRequired,
  onUnallocate: PropTypes.func.isRequired,
  onMatchedToBlur: PropTypes.func.isRequired,
  onSplitRowItemClick: PropTypes.func.isRequired,
  onMatchedToFocus: PropTypes.func.isRequired,
  onUnmatchedFocus: PropTypes.func.isRequired,
  onUnmatchedBlur: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onSaveSplitAllocation: PropTypes.func.isRequired,
  onCancelSplitAllocation: PropTypes.func.isRequired,
  onUnallocateSplitAllocation: PropTypes.func.isRequired,
  onUpdateSplitAllocationHeader: PropTypes.func.isRequired,
  onAddSplitAllocationLine: PropTypes.func.isRequired,
  onUpdateSplitAllocationLine: PropTypes.func.isRequired,
  onDeleteSplitAllocationLine: PropTypes.func.isRequired,
  onSaveMatchTransaction: PropTypes.func.isRequired,
  onCancelMatchTransaction: PropTypes.func.isRequired,
  onUnmatchTransaction: PropTypes.func.isRequired,
};

export default BankTransactionTableBody;
