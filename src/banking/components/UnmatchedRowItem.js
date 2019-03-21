import { Table } from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../components/combobox/AccountCombobox';

const UnmatchedRowItem = ({
  entry,
  onFocus,
  onBlur,
  onAllocate,
  index,
  ...props
}) => {
  const {
    isFocused,
    accountList,
  } = entry;

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
    <button type="button" className="btn btn-link" onClick={onFocus} onFocus={onFocus}>
      <div className="btn-link__container">
        <span className="btn-link__content">Allocate me</span>
      </div>
    </button>
  );

  const view = isFocused ? focusedView : defaultView;

  return (
    <Table.RowItem {...props}>
      {view}
    </Table.RowItem>
  );
};

export default UnmatchedRowItem;
