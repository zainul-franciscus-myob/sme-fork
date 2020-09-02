import React from 'react';

import AllocatedLoadingItem from './AllocatedLoadingItem';
import AllocatedRowItem from './AllocatedRowItem';
import ExpandedRowItem from './ExpandedRowItem';
import HotkeyLocations from '../hotkeys/HotkeyLocations';
import HotkeyWrapper from '../hotkeys/HotkeyWrapper';
import MatchedRowItem from './MatchedRowItem';
import SplitRowItem from './SplitRowItem';
import StatusTypes from '../BankTransactionStatusTypes';
import UnmatchedRowItem from './UnmatchedRowItem';

export default ({
  entry,
  index,
  isExpanded,
  isHovering,
  isFocused,
  onAddAccount,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onFocusTransactionLine,
  onBlur,
  onAllocate,
}) => {
  const { type, displayName, isLoading } = entry;

  if (isLoading) {
    return <AllocatedLoadingItem displayName={displayName} />;
  }

  if (isExpanded) {
    return <ExpandedRowItem entry={entry} />;
  }

  if (
    [
      StatusTypes.matched,
      StatusTypes.paymentRuleMatched,
      StatusTypes.splitMatched,
    ].includes(type)
  ) {
    return (
      <MatchedRowItem
        entry={entry}
        onClick={() => onMatchRowItemClick(index)}
      />
    );
  }

  if ([StatusTypes.splitAllocation, StatusTypes.transfer].includes(type)) {
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
        isHovering={isHovering}
        isFocused={isFocused}
        onAddAccount={onAddAccount}
        onAllocate={(item) => onAllocate(index, item)}
        onFocusTransactionLine={() => onFocusTransactionLine(index)}
        onBlur={() => onBlur(index)}
      />
    );
  }

  return (
    <HotkeyWrapper
      index={index}
      location={HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX}
    >
      <UnmatchedRowItem
        entry={entry}
        isHovering={isHovering}
        isFocused={isFocused}
        onAddAccount={onAddAccount}
        onAllocate={(item) => onAllocate(index, item)}
        onFocusTransactionLine={() => onFocusTransactionLine(index)}
        onBlur={() => onBlur(index)}
      />
    </HotkeyWrapper>
  );
};
