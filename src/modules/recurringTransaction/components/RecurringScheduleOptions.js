import {
  Input,
  Label,
  RadioButton,
  RadioButtonGroup,
  Select,
} from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import Calculator from '../../../components/Calculator/Calculator';
import DatePicker from '../../../components/DatePicker/DatePicker';
import ScheduleFrequency from '../types/ScheduleFrequency';
import ScheduleRecurrence from '../types/ScheduleRecurrence';
import TransactionType from '../types/TransactionType';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './RecurringScheduleOptions.module.css';

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

      <RadioButtonGroup
        value={recurrence}
        label="ScheduleRecurrence"
        hideLabel
        name="recurrence"
        onChange={handleRadioButtonChange(
          'recurrence',
          onUpdateScheduleOptions
        )}
        disabled={isDisabled}
        renderRadios={({ id, value: currentVal, ...props }) => {
          const isRepeatUntilDate =
            currentVal === ScheduleRecurrence.REPEAT_UNTIL_SPECIFIC_DATE;
          const isRepeatNumber =
            currentVal === ScheduleRecurrence.REPEAT_FOR_NUMBER_OF_TIMES;
          return (
            <>
              <RadioButton
                {...props}
                label="Continuing indefinitely"
                value={ScheduleRecurrence.INDEFINITELY}
                checked={currentVal === ScheduleRecurrence.INDEFINITELY}
              />
              <RadioButton
                {...props}
                label="Continuing until this date"
                value={ScheduleRecurrence.REPEAT_UNTIL_SPECIFIC_DATE}
                checked={isRepeatUntilDate}
              />
              {isRepeatUntilDate && (
                <div className={styles.options}>
                  <DatePicker
                    label="End date"
                    requiredLabel={requiredLabel}
                    name="endDate"
                    value={endDate}
                    onSelect={handleDatePickerChange(
                      onUpdateScheduleOptions,
                      'endDate'
                    )}
                    hideLabel
                    disabled={isDisabled}
                  />
                </div>
              )}
              <RadioButton
                {...props}
                label="Perform this number of times"
                value={ScheduleRecurrence.REPEAT_FOR_NUMBER_OF_TIMES}
                checked={isRepeatNumber}
                disabled={isDisabled}
              />
              {isRepeatNumber && (
                <div className={classNames(styles.options, styles.remaining)}>
                  <Calculator
                    name="numberOfTimes"
                    label="Number of times"
                    hideLabel
                    value={numberOfTimes}
                    onChange={handleAmountInputChange(onUpdateScheduleOptions)}
                    numeralIntegerScale={2}
                    numeralDecimalScaleMin={0}
                    numeralDecimalScaleMax={0}
                    width="xs"
                    disabled={isDisabled}
                  />
                  {remainingTimes && (
                    <Label color="light-grey">{`${remainingTimes} remaining`}</Label>
                  )}
                </div>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default RecurringScheduleOptions;
