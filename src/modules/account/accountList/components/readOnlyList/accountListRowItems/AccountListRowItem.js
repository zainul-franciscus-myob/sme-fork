import { Table } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from '../../AccountListTable.module.css';

const AccountListRowItem = ({
  config,
  value,
  indentLevel,
  isSystem,
  isHeader,
  isAccountNumber,
  title,
  hideAccountNumber,
}) => {
  const className = classNames({
    [styles.systemAccount]: isSystem,
    [styles.headerAccount]: isHeader,
    [styles.indent]: indentLevel > 0,
  });

  const isHidden = value === '' || value === undefined ? styles.hidden : '';
  const hideHeaderAccountNumber = hideAccountNumber && isAccountNumber;

  return (
    !config.isHidden &&
    !hideHeaderAccountNumber && (
      <Table.RowItem
        columnName={config.columnName}
        {...config.styles}
        className={isHidden}
      >
        <span
          title={title}
          className={className}
          data-indent-level={indentLevel}
        >
          {value}
        </span>
      </Table.RowItem>
    )
  );
};

export default AccountListRowItem;
