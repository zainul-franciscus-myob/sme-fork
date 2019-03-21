import { Button, Icons, Table } from '@myob/myob-widgets';
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
    allocatedTo,
    isFocused,
    accountList,
  } = entry;

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
    <button type="button" onClick={onFocus} onFocus={onFocus} className={`btn btn-default ${style.allocate}`}>
      {`Matched to ${allocatedTo}`}
    </button>
  );

  const view = isFocused ? focusedView : defaultView;

  return (
    <Table.RowItem {...props}>
      <div className={style.unallocatedRowItem}>
        { view }
        { removeButton }
      </div>
    </Table.RowItem>
  );
};

export default AllocatedRowItem;
