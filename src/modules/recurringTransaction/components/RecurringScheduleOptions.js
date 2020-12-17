import { Input, Select } from '@myob/myob-widgets';
import React from 'react';

import DatePicker from '../../../components/DatePicker/DatePicker';
import RecurringScheduleRecurrenceOptions from './RecurringScheduleRecurrenceOptions';
import ScheduleFrequency from '../types/ScheduleFrequency';
import TransactionType from '../types/TransactionType';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const transactionTypeOptions = [
  { value: TransactionType.BILL, label: 'Bill' },
  { value: TransactionType.INVOICE, label: 'Invoice' },
  { value: TransactionType.GENERAL_JOURNAL, label: 'General journal' },
  { value: TransactionType.QUOTE, label: 'Quote' },
  { value: TransactionType.RECEIVE_MONEY, label: 'Receive money' },
  { value: TransactionType.SPEND_MONEY, label: 'Spend money' },
  { value: TransactionType.TRANSFER_MONEY, label: 'Transfer money' },
];

const frequencyOptions = [
  { value: ScheduleFrequency.NEVER, label: 'Never' },
  { value: ScheduleFrequency.DAILY, label: 'Daily' },
  { value: ScheduleFrequency.WEEKLY, label: 'Weekly' },
  { value: ScheduleFrequency.FORTNIGHTLY, label: 'Fortnightly' },
  { value: ScheduleFrequency.TWICE_A_MONTH, label: 'Twice a month' },
  { value: ScheduleFrequency.EVERY_THREE_WEEKS, label: 'Every 3 weeks' },
  { value: ScheduleFrequency.EVERY_FOUR_WEEKS, label: 'Every 4 weeks' },
  { value: ScheduleFrequency.MONTHLY, label: 'Monthly' },
  { value: ScheduleFrequency.EVERY_OTHER_MONTH, label: 'Every other month' },
  { value: ScheduleFrequency.QUARTERLY, label: 'Quarterly' },
  { value: ScheduleFrequency.EVERY_FOUR_MONTHS, label: 'Every 4 months' },
  { value: ScheduleFrequency.EVERY_SIX_MONTHS, label: 'Every 6 months' },
  { value: ScheduleFrequency.ANNUALLY, label: 'Annually' },
];

const RecurringScheduleOptions = ({
  name,
  frequency,
  recurrence,
  nextDueDate,
  endDate,
  numberOfTimes,
  remainingTimes,
  transactionType,
  isDisabled,
  showTransactionType,
  onUpdateScheduleOptions,
}) => {
  const requiredLabel = 'This is required';

  return (
    <>
      {showTransactionType && (
        <Select
          name="transactionType"
          label="Transaction type"
          value={transactionType}
          requiredLabel={requiredLabel}
          disabled
        >
          {transactionTypeOptions.map((option) => (
            <Select.Option
              value={option.value}
              label={option.label}
              key={option.value}
            />
          ))}
        </Select>
      )}
      <Input
        name="name"
        label="Schedule name"
        value={name}
        onChange={handleInputChange(onUpdateScheduleOptions)}
        requiredLabel={requiredLabel}
        maxLength={30}
        disabled={isDisabled}
      />
      <Select
        name="frequency"
        label="Frequency"
        value={frequency}
        requiredLabel={requiredLabel}
        disabled={isDisabled}
        onChange={handleSelectChange(onUpdateScheduleOptions)}
      >
        {frequencyOptions.map((option) => (
          <Select.Option
            value={option.value}
            label={option.label}
            key={option.value}
          />
        ))}
      </Select>
      {frequency !== ScheduleFrequency.NEVER && (
        <>
          <DatePicker
            label="Starting"
            requiredLabel={requiredLabel}
            name="nextDueDate"
            value={nextDueDate}
            onSelect={handleDatePickerChange(
              onUpdateScheduleOptions,
              'nextDueDate'
            )}
            disabled={isDisabled}
          />
          <RecurringScheduleRecurrenceOptions
            recurrence={recurrence}
            endDate={endDate}
            numberOfTimes={numberOfTimes}
            remainingTimes={remainingTimes}
            isDisabled={isDisabled}
            requiredLabel={requiredLabel}
            onUpdateScheduleOptions={onUpdateScheduleOptions}
          />
        </>
      )}
    </>
  );
};

export default RecurringScheduleOptions;
