import { Field, Select } from '@myob/myob-widgets';
import React from 'react';

import styles from './MonthYearSelect.module.css';

const OpeningBalanceDate = (props) => {
  const { labelAccessory, month, year, onMonthChange, monthOptions } = props;

  const OpeningBalanceMonth = (
    <div className={styles.month}>
      <Select
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

  return (
    <Field
      label="Opening balance date"
      labelAccessory={labelAccessory}
      renderField={() => (
        <div className={styles.container}>
          {OpeningBalanceMonth}
          {OpeningBalanceYear}
        </div>
      )}
    />
  );
};

export default OpeningBalanceDate;
