import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import AllocatedRowItem from './AllocatedRowItem';
import ExpandedRowItem from './ExpandedRowItem';
import MatchedRowItem from './MatchedRowItem';
import SplitRowItem from './SplitRowItem';
import StatusTypes from '../BankTransactionStatusTypes';
import UnmatchedRowItem from './UnmatchedRowItem';

export default ({
  entry,
  onAddAccount,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onMatchedToFocus,
  onMatchedToBlur,
  onUnmatchedBlur,
  onUnmatchedFocus,
  onAllocate,
  index,
  isExpanded,
}) => {
  const {
    type,
    isLoading,
  } = entry;

  if (isLoading) {
    return (
      <Spinner size="small" />
    );
  }

  if (isExpanded) {
    return (
      <ExpandedRowItem
        entry={entry}
      />
    );
  }

  if ([
    StatusTypes.matched,
    StatusTypes.paymentRuleMatched,
    StatusTypes.splitMatched,
  ].includes(type)) {
    return (
      <MatchedRowItem
        entry={entry}
        onClick={() => onMatchRowItemClick(index)}
      />
    );
  }

  if ([
    StatusTypes.splitAllocation,
    StatusTypes.transfer,
  ].includes(type)) {
    return (
      <SplitRowItem
        index={index}
        entry={entry}
        onClick={() => onSplitRowItemClick(index)}
      />
    );
  }

  if (type === StatusTypes.singleAllocation) {
    return (
      <AllocatedRowItem
        entry={entry}
        onAddAccount={onAddAccount}
        onAllocate={item => onAllocate(index, item)}
        onFocus={() => onMatchedToFocus(index)}
        onBlur={() => onMatchedToBlur(index)}
      />
    );
  }

  return (
    <UnmatchedRowItem
      onAddAccount={onAddAccount}
      entry={entry}
      onAllocate={item => onAllocate(index, item)}
      onFocus={() => onUnmatchedFocus(index)}
      onBlur={() => onUnmatchedBlur(index)}
    />
  );
};
