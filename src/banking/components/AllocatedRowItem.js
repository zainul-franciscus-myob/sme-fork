import {
  Button, Icons, Label, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../components/combobox/AccountCombobox';
import style from './BankingView.css';

const AllocatedRowItem = ({
  entry,
  onFocus,
  onBlur,
  onAllocate,
  onUnallocate,
  ...props
}) => {
  const {
    allocateOrMatch,
    isFocused,
    accountList,
    isReportable,
  } = entry;

  const label = isReportable && (
    <div className={style.reportableTooltip}>
      <Tooltip
        triggerContent={<Label type="boxed" color="purple" size="small">R</Label>}
      >
        Reportable payment
      </Tooltip>
    </div>
  );

  const removeButton = (
    <Button type="secondary" className={style.unallocate} size="xs" onClick={onUnallocate}>
      <Icons.Remove />
    </Button>
  );

  const focusedView = (
    <AccountCombobox
      items={accountList}
      onChange={onAllocate}
      onBlur={onBlur}
      autoFocus
      preventTabbingOnSelect
    />
  );

  const defaultView = (
    <div className={style.buttonLinkWrapper}>
      <button type="button" className={`btn btn-link ${style.allocateButton}`} onClick={onFocus} onFocus={onFocus}>
        <div className="btn-link__container">
          <span className="btn-link__content" title={allocateOrMatch}>
            {allocateOrMatch}
          </span>
        </div>
      </button>
    </div>
  );

  const view = isFocused ? focusedView : defaultView;

  return (
    <Table.RowItem {...props}>
      <div className={style.unallocatedRowItem}>
        { view }
        { label }
        { removeButton }
      </div>
    </Table.RowItem>
  );
};

export default AllocatedRowItem;
