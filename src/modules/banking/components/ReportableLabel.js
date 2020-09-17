import { Label, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './ReportableLabel.module.css';

const ReportableLabel = ({ className = '' }) => (
  <Tooltip
    className={classNames(styles.reportable, className)}
    triggerContent={
      <Label type="boxed" color="purple" size="small">
        R
      </Label>
    }
  >
    Reportable payment via TPAR
  </Tooltip>
);

export default ReportableLabel;
