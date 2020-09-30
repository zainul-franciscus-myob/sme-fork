import { Button } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AttachmentLabel from './AttachmentLabel';
import styles from './UnmatchedRowItem.module.css';

const UnmatchedRowItem = ({
  entry,
  isHovering,
  isFocused,
  onFocusTransactionLine,
  onBlur,
  onAllocate,
  onAddAccount,
}) => {
  const { accountList, allocateOrMatch, hasAttachment } = entry;

  const hintText = isFocused ? '' : allocateOrMatch;
  const comboboxStyling = classNames(styles.allocating, {
    [styles.hovering]: isHovering && !isFocused,
  });

  const combobox = (
    <div className={comboboxStyling}>
      <AccountCombobox
        items={accountList}
        onChange={onAllocate}
        onBlur={onBlur}
        onFocus={onFocusTransactionLine}
        autoFocus={isFocused}
        label="Allocate to"
        hintText={hintText}
        addNewAccount={() => onAddAccount(onAllocate)}
        hideLabel
        preventTabbingOnSelect
        width="xl"
      />
    </div>
  );

  const focusedView = (
    <div className={styles.focusedAllocating}>
      {combobox}
      {hasAttachment && <AttachmentLabel />}
    </div>
  );

  const defaultView = (
    <div className={styles.unallocated}>
      <Button
        type="link"
        onClick={onFocusTransactionLine}
        onFocus={onFocusTransactionLine}
      >
        {allocateOrMatch}
      </Button>
      {hasAttachment && <AttachmentLabel className={styles.attachmentClip} />}
    </div>
  );

  return isFocused || isHovering ? focusedView : defaultView;
};

export default UnmatchedRowItem;
