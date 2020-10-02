import { Input, Table } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import { getAccountNumberCounts } from '../../../AccountListSelectors';
import ReadOnlyRowItem from './ReadOnlyRowItem';
import styles from '../../AccountListTable.module.css';

const handleOnChange = (handler, index) => (e) => {
  const { name, value } = e.target;
  handler({ index, key: name, value });
};

const AccountNumberRowItem = ({
  config,
  accountNumber,
  indentLevel,
  isHeader,
  isSystem,
  index,
  onChange,
  entries,
}) => {
  if (isSystem) {
    return (
      <ReadOnlyRowItem
        config={config}
        value={accountNumber}
        title={accountNumber}
        indentLevel={indentLevel}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    );
  }

  const className = classNames({
    [styles.headerAccount]: isHeader,
    [styles.indent]: indentLevel > 0,
    [styles.bulkUpdateHeaderRow]: true,
  });

  return (
    <Table.RowItem columnName={config.columnName} {...config.styles}>
      <div className={className} data-indent-level={indentLevel}>
        <Input
          name={config.fieldName}
          width="xs"
          value={accountNumber}
          onChange={handleOnChange(onChange, index)}
          errorMessage={
            getAccountNumberCounts(entries)[accountNumber] > 1 &&
            'Account number already exists'
          }
          errorMessageInline={
            getAccountNumberCounts(entries)[accountNumber] > 1
          }
        />
      </div>
    </Table.RowItem>
  );
};

export default AccountNumberRowItem;
