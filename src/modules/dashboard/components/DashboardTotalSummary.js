import { Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import HeaderItem from './DashboardHeaderItem';
import styles from './DashboardTotalSummary.module.css';

const DashboardTotalSummary = ({ items = [], className = '' }) => {
  const body = items.map(
    ({ title, content, link, tooltip, labelAccessory }) => {
      const headerItem = (
        <HeaderItem
          key={title}
          title={title}
          content={content}
          clickable={link}
          labelAccessory={labelAccessory}
        />
      );

      const tooltipOrLink = tooltip ? (
        <a key={title} href={link}>
          <Tooltip triggerContent={headerItem}>Last 12 Months</Tooltip>
        </a>
      ) : (
        <a key={title} href={link}>
          {headerItem}
        </a>
      );

      return link ? tooltipOrLink : headerItem;
    }
  );

  return (
    <div className={classNames(styles.totalHeader, className)}>{body}</div>
  );
};

export default DashboardTotalSummary;
