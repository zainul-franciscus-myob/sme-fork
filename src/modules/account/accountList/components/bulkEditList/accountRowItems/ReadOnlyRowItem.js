import { Table } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from '../../AccountListTable.module.css';

const ReadOnlyRowItem = ({
  config,
  value,
  indentLevel,
  isSystem,
  isHeader,
  title,
}) => {
  const className = classNames({
    [styles.systemAccount]: isSystem,
    [styles.headerAccount]: isHeader,
    [styles.indent]: indentLevel > 0,
    [styles.bulkUpdateHeaderRow]: true,
  });

  const isHidden = value === '' || value === undefined ? styles.hidden : '';

  return (
    !config.isHidden && (
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

export default ReadOnlyRowItem;
