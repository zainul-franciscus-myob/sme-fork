import { Input, Select } from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './RecurringScheduleOptions.module.css';

const RecurringScheduleOptions = ({
  name,
  transactionType,
  transactionTypeOptions = [],
  isDisabled,
  onUpdateScheduleOptions,
}) => {
  const requiredLabel = 'This is required';

  return (
    <div className={styles.container}>
      <Select
        name="transactionType"
        label="Transaction type"
        value={transactionType}
        requiredLabel={requiredLabel}
        disabled
      >
        {transactionTypeOptions.map((option) => (
          <Select.Option
            value={option.name}
            label={option.displayName}
            key={option.name}
          />
        ))}
      </Select>
      <Input
        name="name"
        label="Name"
        value={name}
        onChange={handleInputChange(onUpdateScheduleOptions)}
        requiredLabel={requiredLabel}
        maxLength={30}
        disabled={isDisabled}
      />
    </div>
  );
};

export default RecurringScheduleOptions;
