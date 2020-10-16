import { Input, Table } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import ReadOnlyRowItem from './ReadOnlyRowItem';
import styles from '../../AccountListTable.module.css';

const handleOnChange = (handler, index, prefix) => (e) => {
  const { name, value } = e.target;
  handler({ index, prefix, key: name, value });
};

const AccountNumberRowItem = ({
  config,
  accountNumber,
  indentLevel,
  isSystem,
  isHeader,
  index,
  onChange,
  onBlur,
  prefix,
  accountNumberCount,
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
          onChange={handleOnChange(onChange, index, prefix)}
          onBlur={handleOnChange(onBlur, index, prefix)}
          errorMessage={
            accountNumberCount[accountNumber] > 1 &&
            'Account number already exists'
          }
          errorMessageInline={accountNumberCount[accountNumber] > 1}
        />
      </div>
    </Table.RowItem>
  );
};

export default AccountNumberRowItem;
