import React from 'react';
import classNames from 'classnames';

import HeaderItem from './DashboardHeaderItem';
import styles from './DashboardTotalSummary.module.css';

const DashboardTotalSummary = ({ items = [], className = '' }) => {
  const body = items.map(({
    title, content, link, labelAccessory,
  }) => {
    const headerItem = (
      <HeaderItem
        key={title}
        title={title}
        content={content}
        clickable={link}
        labelAccessory={labelAccessory}
      />
    );

    return link
      ? <a key={title} href={link}>{headerItem}</a>
      : headerItem;
  });

  return (
    <div className={classNames(styles.totalHeader, className)}>
      { body }
    </div>
  );
};

export default DashboardTotalSummary;
