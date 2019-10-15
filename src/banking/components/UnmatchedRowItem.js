import { Button } from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../components/combobox/AccountCombobox';
import styles from './UnmatchedRowItem.module.css';

const UnmatchedRowItem = ({
  entry,
  onFocus,
  onBlur,
  onAllocate,
}) => {
  const {
    isFocused,
    accountList,
    allocateOrMatch,
  } = entry;

  const focusedView = (
    <div className={styles.allocating}>
      <AccountCombobox
        items={accountList}
        onChange={onAllocate}
        onBlur={onBlur}
        autoFocus
        label="Allocate to"
        hideLabel
        preventTabbingOnSelect
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

  return isFocused ? focusedView : defaultView;
};

export default UnmatchedRowItem;
