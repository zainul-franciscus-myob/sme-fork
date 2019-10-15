import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import AllocatedRowItem from './AllocatedRowItem';
import ExpandedRowItem from './ExpandedRowItem';
import MatchedRowItem from './MatchedRowItem';
import SplitRowItem from './SplitRowItem';
import UnmatchedRowItem from './UnmatchedRowItem';

export default ({
  entry,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onMatchedToFocus,
  onMatchedToBlur,
  onUnmatchedBlur,
  onUnmatchedFocus,
  onAllocate,
  onUnallocate,
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

  if (type === 'matched') {
    return (
      <MatchedRowItem
        entry={entry}
        onClick={() => onMatchRowItemClick(index)}
      />
    );
  }

  if (type === 'splitAllocation' || type === 'payment' || type === 'transfer') {
    return (
      <SplitRowItem
        index={index}
        entry={entry}
        onClick={() => onSplitRowItemClick(index)}
      />
    );
  }

  if (type === 'singleAllocation') {
    return (
      <AllocatedRowItem
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
      entry={entry}
      onAllocate={item => onAllocate(index, item)}
      onFocus={() => onUnmatchedFocus(index)}
      onBlur={() => onUnmatchedBlur(index)}
    />
  );
};
