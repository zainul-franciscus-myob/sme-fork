import React from 'react';
import classNames from 'classnames';

import styles from './DashboardTotalSummary.module.css';

const HeaderItem = ({ title, content, clickable }) => (
  <div className={classNames(styles.headerItem, { [styles.headerItemClickable]: clickable })}>
    <div>
      {title}
    </div>
    <div>
      <h2 className={styles.headerItem__content}>{content}</h2>
    </div>
  </div>
);

const DashboardTotalSummary = ({ items = [] }) => {
  const body = items.map(({ title, content, link }) => {
    const headerItem = <HeaderItem title={title} content={content} clickable={link} />;

    return link
      ? <a href={link}>{headerItem}</a>
      : headerItem;
  });

  return (
    <div className={styles.totalHeader}>
      { body }
    </div>
  );
};

export default DashboardTotalSummary;
