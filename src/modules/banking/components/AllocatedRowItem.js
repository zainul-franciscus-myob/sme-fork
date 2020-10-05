import React from 'react';
import classNames from 'classnames';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AllocatedButton from './AllocatedButton';
import AttachmentLabel from './AttachmentLabel';
import AutoAllocated from './AutoAllocated';
import QuantityLabel from './QuantityLabel';
import ReportableLabel from './ReportableLabel';
import styles from './AllocatedRowItem.module.css';

const AllocatedRowItem = ({
  entry,
  isHovering,
  isFocused,
  onAddAccount,
  onFocusTransactionLine,
  onBlur,
  onAllocate,
}) => {
  const {
    allocateOrMatch,
    accountList,
    isReportable,
    hasAttachment,
    hasQuantity,
    isRuleApplied,
  } = entry;

  const comboboxStyling = classNames(styles.allocating, {
    [styles.hovering]: isHovering && !isFocused,
  });

  const combobox = (
    <div className={comboboxStyling}>
      <AccountCombobox
        items={accountList}
        label="Allocate to"
        hideLabel
        autoFocus={isFocused}
        onChange={onAllocate}
        onFocus={onFocusTransactionLine}
        onBlur={onBlur}
        preventTabbingOnSelect
        selectedId={entry.selectedAccountId}
        addNewAccount={() => onAddAccount(onAllocate)}
      />
    </div>
  );

  const focusedView = (
    <div className={styles.focusedAllocating}>
      {isRuleApplied && <AutoAllocated className={styles.allocatedWand} />}
      {combobox}
      {hasAttachment && <AttachmentLabel />}
      {hasQuantity && <QuantityLabel />}
      {isReportable && <ReportableLabel />}
    </div>
  );

  const ruleHiddenStyling = isRuleApplied ? '' : styles.ruleHidden;
  const defaultView = (
    <div className={styles.allocated}>
      <div className={classNames(styles.allocationInfo, ruleHiddenStyling)}>
        {isRuleApplied && <AutoAllocated />}
        <AllocatedButton
          onClick={onFocusTransactionLine}
          onFocus={onFocusTransactionLine}
        >
          {allocateOrMatch}
        </AllocatedButton>
      </div>
      {hasAttachment && <AttachmentLabel />}
      {hasQuantity && <QuantityLabel />}
      {isReportable && <ReportableLabel />}
    </div>
  );

  return isFocused || isHovering ? focusedView : defaultView;
};

export default AllocatedRowItem;
