import {
  Button, Icons, Label, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AllocatedButton from './AllocatedButton';
import AutoAllocated from './AutoAllocated';
import styles from './AllocatedRowItem.module.css';

const AllocatedRowItem = ({
  entry,
  onFocus,
  onBlur,
  onAllocate,
  onUnallocate,
}) => {
  const {
    allocateOrMatch,
    isFocused,
    accountList,
    isReportable,
    appliedRule,
  } = entry;

  const label = isReportable && (
    <Tooltip
      className={styles.reportable}
      triggerContent={<Label type="boxed" color="blue" size="small">R</Label>}
    >
      Reportable payment
    </Tooltip>
  );

  const unmatchButton = (
    <Button type="secondary" size="xs" onClick={onUnallocate}>
      <Icons.UnLink />
    </Button>
  );

  const focusedView = (
    <div className={styles.allocating}>
      <AccountCombobox
        items={accountList}
        label="Allocate to"
        hideLabel
        onChange={onAllocate}
        onBlur={onBlur}
        autoFocus
        preventTabbingOnSelect
        selectedId={entry.selectedAccountId}
      />
    </div>
  );

  const defaultView = (
    <div className={styles.allocated}>
      <div className={styles.allocationInfo}>
        { appliedRule && <AutoAllocated /> }
        <AllocatedButton onClick={onFocus} onFocus={onFocus}>
          {allocateOrMatch}
        </AllocatedButton>
        <Tooltip className={styles.unmatch} triggerContent={unmatchButton}>
          Unmatch
        </Tooltip>
      </div>
      {label}
    </div>
  );

  return isFocused ? focusedView : defaultView;
};

export default AllocatedRowItem;
