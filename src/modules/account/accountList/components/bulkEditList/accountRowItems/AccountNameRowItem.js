import { Input, Table } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import ReadOnlyRowItem from './ReadOnlyRowItem';
import styles from '../../AccountListTable.module.css';

const handleChange = (handler, index) => (e) => {
  const { name, value } = e.target;
  handler({ index, key: name, value });
};

const AccountNameRowItem = ({
  config,
  accountName,
  isSystem,
  isHeader,
  index,
  onChange,
}) => {
  if (isSystem) {
    return (
      <ReadOnlyRowItem
        config={config}
        value={accountName}
        title={accountName}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    );
  }
  const className = classNames({
    [styles.headerAccount]: isHeader,
    [styles.bulkUpdateHeaderRow]: true,
  });

  return (
    <Table.RowItem columnName={config.columnName} {...config.styles}>
      <div className={className}>
        <Input
          label=""
          name={config.fieldName}
          width="md"
          value={accountName}
          onChange={handleChange(onChange, index)}
        />
      </div>
    </Table.RowItem>
  );
};

export default AccountNameRowItem;
