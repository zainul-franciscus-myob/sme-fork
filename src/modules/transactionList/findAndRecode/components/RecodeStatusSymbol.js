import { Spinner, TickIcon, Tooltip, WarningIcon } from '@myob/myob-widgets';
import React from 'react';

import RecodeStatus from '../types/RecodeStatus';
import styles from './RecodeStatusSymbol.module.css';

const toSymbol = ({ status, error }) => {
  switch (status) {
    case RecodeStatus.LOADING:
      return <Spinner size="small" />;
    case RecodeStatus.SUCCESS:
      return <TickIcon className={styles.success} />;
    case RecodeStatus.FAILURE:
      return (
        <Tooltip triggerContent={<WarningIcon className={styles.failure} />}>
          {error}
        </Tooltip>
      );
    default:
      return null;
  }
};

const RecodeStatusSymbol = ({ recodeItem = {} }) => {
  const symbol = toSymbol(recodeItem);
  return <div>{symbol}</div>;
};

export default RecodeStatusSymbol;
