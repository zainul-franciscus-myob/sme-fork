import {
  Field, Input, Select, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './YearSelect.module.css';

const YearSelect = props => {
  const { financialYearOptions, disabled, value } = props;

  const selectYearCombobox = (
    <Select {...props} hideLabel>
    {
      financialYearOptions.map(financialYear => (
        <Select.Option value={financialYear} label={financialYear} />
      ))
    }
    </Select>
  );

  const triggerContent = (
    <div className={styles.tooltipTrigger}>
      <Input
        defaultValue={value}
        disabled
        className={styles.yearInput}
        hideLabel
      />
    </div>
  );

  const inputWithTooltip = (
    <Tooltip triggerContent={triggerContent}>
      The current financial year cannot be changed because you have existing transactions.
    </Tooltip>
  );

  // Using input for disabled state instead of select as tooltip was having issues with select
  const renderField = (disabled ? inputWithTooltip : selectYearCombobox);

  return (
    <Field
      label="Current financial year"
      renderField={() => (
        renderField
      )}
    />
  );
};

export default YearSelect;
