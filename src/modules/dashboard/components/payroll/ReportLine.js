import { StarIcon } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './ReportLine.module.css';

const ReportLine = ({ isFavourite, url, children }) => (
  <div
    className={classNames(styles.reportLine, {
      [styles.favouriteLine]: isFavourite,
    })}
  >
    <StarIcon />
    <a href={url}>{children}</a>
  </div>
);

export default ReportLine;
