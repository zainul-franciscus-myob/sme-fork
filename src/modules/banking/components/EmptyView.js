import React from 'react';

import styles from './EmptyView.module.css';

const EmptyView = ({ children }) => (
  <div className={styles.openEntryEmpty}>{children}</div>
);

export default EmptyView;
