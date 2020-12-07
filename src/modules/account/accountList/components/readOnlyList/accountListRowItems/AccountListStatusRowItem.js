import { Label, Table } from '@myob/myob-widgets';
import React from 'react';

import styles from '../../AccountListTable.module.css';

const AccountListStatusRowItem = ({ tableConfig, isInactive }) => (
  <Table.RowItem
    columnName={tableConfig.status.columnName}
    className={!isInactive ? styles.hidden : ''}
  >
    {isInactive ? (
      <Label type="boxed" color="light-grey" size="small">
        Inactive
      </Label>
    ) : (
      <span />
    )}
  </Table.RowItem>
);

export default AccountListStatusRowItem;
