import { Button } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import styles from './UnmatchedRowItem.module.css';

const UnmatchedRowItem = ({
  entry,
  isHovering,
  isFocused,
  onFocus,
  onBlur,
  onAllocate,
  onAddAccount,
}) => {
  const {
    accountList,
    allocateOrMatch,
  } = entry;

  const hintText = isFocused ? '' : allocateOrMatch;
  const focusedViewStyling = classNames(styles.allocating, {
    [styles.hovering]: isHovering && !isFocused,
  });

  const focusedView = (
    <div className={focusedViewStyling}>
      <AccountCombobox
        items={accountList}
        onChange={onAllocate}
        onBlur={onBlur}
        onFocus={onFocus}
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

  const defaultView = (
    <div className={styles.unallocated}>
      <Button
        type="link"
        onClick={onFocus}
        onFocus={onFocus}
      >
        {allocateOrMatch}
      </Button>
    </div>
  );

  return isFocused || isHovering ? focusedView : defaultView;
};

export default UnmatchedRowItem;
