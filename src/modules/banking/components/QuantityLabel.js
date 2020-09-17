import { Label, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './QuantityLabel.module.css';

const QuantityLabel = ({ className = '' }) => (
  <Tooltip
    className={classNames(styles.quantity, className)}
    triggerContent={
      <Label type="boxed" color="purple" size="small">
        Q
      </Label>
    }
  >
    This transaction contains a quantity
  </Tooltip>
);

export default QuantityLabel;
