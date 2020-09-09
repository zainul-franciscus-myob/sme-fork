import React from 'react';

import AllocatedLoadingItem from './AllocatedLoadingItem';
import AllocatedRowItem from './AllocatedRowItem';
import ExpandedRowItem from './ExpandedRowItem';
import HotkeyLocations from '../hotkeys/HotkeyLocations';
import HotkeyWrapper from '../hotkeys/HotkeyWrapper';
import MatchedRowItem from './MatchedRowItem';
import SplitRowItem from './SplitRowItem';
import StatusTypes from '../types/BankTransactionStatusTypes';
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

  if ([StatusTypes.matched, StatusTypes.paymentRuleMatched].includes(type)) {
    return (
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.POSSIBLE_MATCHED_BUTTON}
      >
        <MatchedRowItem
          entry={entry}
          onClick={() => onMatchRowItemClick(index)}
          isFocused={isFocused}
        />
      </HotkeyWrapper>
    );
  }

  if (type === StatusTypes.splitMatched) {
    return (
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.APPROVED_TRANSACTION_BUTTON}
      >
        <MatchedRowItem
          entry={entry}
          onClick={() => onMatchRowItemClick(index)}
          isFocused={isFocused}
        />
      </HotkeyWrapper>
    );
  }

  if ([StatusTypes.splitAllocation, StatusTypes.transfer].includes(type)) {
    return (
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.APPROVED_TRANSACTION_BUTTON}
      >
        <SplitRowItem
          index={index}
          entry={entry}
          onClick={() => onSplitRowItemClick(index)}
          isFocused={isFocused}
        />
      </HotkeyWrapper>
    );
  }

  if (type === StatusTypes.singleAllocation) {
    return (
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.APPROVED_TRANSACTION_BUTTON}
      >
        <AllocatedRowItem
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
