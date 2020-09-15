import { Field, Select, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './OpeningBalanceDate.module.css';

const OpeningBalanceDate = (props) => {
  const { labelAccessory, month, year, onMonthChange, monthOptions } = props;

  const OpeningBalanceMonth = (
    <div className={styles.month}>
      <Select
        label=""
        hideLabel
        name="openingBalanceMonth"
        value={month}
        onChange={onMonthChange}
      >
        {monthOptions.map((name, i) => (
          <Select.Option key={name} value={i + 1} label={name} />
        ))}
      </Select>
    </div>
  );

  const OpeningBalanceYear = <div className={styles.year}>{year}</div>;

  const OpeningBalanceYearWithTooltip = (
    <Tooltip triggerContent={OpeningBalanceYear}>
      The opening balance year is related to the current financial year.
    </Tooltip>
  );

  return (
    <Field
      label="Opening balance date"
      labelAccessory={labelAccessory}
      renderField={() => (
        <div className={styles.container}>
          {OpeningBalanceMonth}
          {OpeningBalanceYearWithTooltip}
        </div>
      )}
    />
  );
};

export default OpeningBalanceDate;
