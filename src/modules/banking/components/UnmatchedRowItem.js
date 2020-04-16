import { Button } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import styles from './UnmatchedRowItem.module.css';

const UnmatchedRowItem = ({
  entry,
  onFocus,
  onBlur,
  onAllocate,
  onAddAccount,
}) => {
  const {
    isFocused,
    isHovered,
    accountList,
    allocateOrMatch,
  } = entry;

  const additionalStyling = isHovered && !isFocused ? styles.hovering : '';
  const hintText = isFocused ? '' : allocateOrMatch;
  const focusedView = (
    <div className={classNames(styles.allocating, additionalStyling)}>
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

  return isFocused || isHovered ? focusedView : defaultView;
};

export default UnmatchedRowItem;
