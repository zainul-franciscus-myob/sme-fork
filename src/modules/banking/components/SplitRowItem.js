import React from 'react';
import classNames from 'classnames';

import AllocatedButton from './AllocatedButton';
import AutoAllocated from './AutoAllocated';
import QuantityLabel from './QuantityLabel';
import ReportableLabel from './ReportableLabel';
import styles from './SplitRowItem.module.css';

const SplitRowItem = ({ entry, ...props }) => (
  <div className={styles.splitAllocation}>
    <div
      className={classNames(
        styles.splitInfo,
        entry.isRuleApplied ? '' : styles.ruleAppliedHidden
      )}
    >
      {entry.isRuleApplied && <AutoAllocated />}
      <AllocatedButton {...props}>{entry.allocateOrMatch}</AllocatedButton>
    </div>
    {entry.hasQuantity && <QuantityLabel />}
    {entry.isReportable && <ReportableLabel />}
  </div>
);

export default SplitRowItem;
