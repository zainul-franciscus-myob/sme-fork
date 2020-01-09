import React from 'react';

import styles from './DocumentInfo.module.css';

const DocumentInfo = ({ title, items }) => (
  <div className={styles.container}>
    <h3>{title}</h3>
    <div className={styles.items}>
      {items.map(({ name, value }) => (
        <div className={styles.item}>
          <h5>{name}</h5>
          <p>{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default DocumentInfo;
