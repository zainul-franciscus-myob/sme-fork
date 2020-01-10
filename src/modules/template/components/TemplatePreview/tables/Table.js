import React from 'react';
import classnames from 'classnames';

import styles from './Table.module.css';

const TableHeader = ({ columns }) => (
  <div className={styles.header}>
    {columns.map(({
      name, description, width, rightAlign,
    }) => (
      <div
        style={{ flex: `0 0 ${width}` || '1 1 auto' }}
        className={classnames(styles.headerItem, { [styles.rightAlign]: rightAlign })}
      >
        <h5>{name}</h5>
        {description && <div className={styles.headerItemDescription}>{description}</div>}
      </div>
    ))}
  </div>
);

const TableRow = ({ columns, item }) => (
  <div className={styles.row}>
    {columns.map(({ key, width, rightAlign }) => (
      <div
        style={{ flex: `0 0 ${width}` || '1 1 auto' }}
        className={classnames(styles.rowItem, { [styles.rightAlign]: rightAlign })}
      >
        {item[key]}
      </div>
    ))}
  </div>
);

const Table = ({ columns, items }) => (
  <div>
    <TableHeader columns={columns} />
    <div className={styles.body}>
      {items.map(item => (
        <TableRow item={item} columns={columns} />
      ))}
    </div>
  </div>
);

export default Table;
