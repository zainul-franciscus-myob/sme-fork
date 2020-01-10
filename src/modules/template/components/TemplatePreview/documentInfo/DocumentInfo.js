import React from 'react';
import classnames from 'classnames';

import styles from './DocumentInfo.module.css';

const DocumentInfo = ({ title, items }) => (
  <div className={styles.container}>
    <h3 className={styles.header}>{title}</h3>
    <div className={styles.items}>
      {items.map(({ name, value, className }) => (
        <div className={classnames(styles.item, className)}>
          <h5>{name}</h5>
          <p>{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default DocumentInfo;
