import { Field, Select } from '@myob/myob-widgets';
import React from 'react';

import styles from './MonthYearSelect.module.css';

const MonthYearSelect = props => {
  const {
    labelAccessory, month, year, yearOptions, onYearChange, onMonthChange, monthOptions,
  } = props;

  const MonthSelect = (
    <div className={styles.month}>
      <Select
        hideLabel
        name="openingBalanceMonth"
        value={month}
        onChange={onMonthChange}
      >
        {
          monthOptions.map((name, i) => (
            <Select.Option key={name} value={i + 1} label={name} />
          ))
        }
      </Select>
    </div>
  );

  const YearSelect = (
    <div className={styles.year}>
      <Select
        hideLabel
        name="openingBalanceYear"
        value={year}
        onChange={onYearChange}
      >
        {
          yearOptions.map((name) => (
            <Select.Option value={name} key={name} label={name} />
          ))
        }
      </Select>
    </div>
  );

  return <Field
    label="Opening balance month"
    labelAccessory={labelAccessory}
    renderField={() => (
      <div className={styles.container}>
        {MonthSelect}
        {YearSelect}
      </div>
    )}
  />;
};

export default MonthYearSelect;
