import React from 'react';
import classNames from 'classnames';

import styles from './DashboardHeaderItem.module.css';

const DashboardHeaderItem = ({
  title, content, clickable, labelAccessory,
}) => (
  <div className={classNames(styles.headerItem, { [styles.headerItemClickable]: clickable })}>
    <div>
      {title}
      {labelAccessory && (
        <span className={styles.labelAccessory}>
          {labelAccessory}
        </span>
      )}
    </div>
    <div>
      <h2 className={styles.headerItem__content}>{content}</h2>
    </div>
  </div>
);

export default DashboardHeaderItem;
