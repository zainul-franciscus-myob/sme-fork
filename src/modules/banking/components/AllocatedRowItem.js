import { Label, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AllocatedButton from './AllocatedButton';
import AutoAllocated from './AutoAllocated';
import styles from './AllocatedRowItem.module.css';

const ReportableLabel = () => (
  <Tooltip
    className={styles.reportable}
    triggerContent={
      <Label type="boxed" color="blue" size="small">
        R
      </Label>
    }
  >
    Reportable payment
  </Tooltip>
);

const AllocatedRowItem = ({
  entry,
  isHovering,
  isFocused,
  onAddAccount,
  onFocusTransactionLine,
  onBlur,
  onAllocate,
}) => {
  const { allocateOrMatch, accountList, isReportable, isRuleApplied } = entry;

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
      {isReportable && <ReportableLabel />}
    </div>
  );

  const reportableHiddenStyling = isRuleApplied ? '' : styles.reportableHidden;
  const defaultView = (
    <div className={styles.allocated}>
      <div
        className={classNames(styles.allocationInfo, reportableHiddenStyling)}
      >
        {isRuleApplied && <AutoAllocated className={styles.allocatedWand} />}
        <AllocatedButton
          onClick={onFocusTransactionLine}
          onFocus={onFocusTransactionLine}
        >
          {allocateOrMatch}
        </AllocatedButton>
      </div>
      {isReportable && <ReportableLabel />}
    </div>
  );

  return isFocused || isHovering ? focusedView : defaultView;
};

export default AllocatedRowItem;
