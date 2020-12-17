import { Label, RadioButton, RadioButtonGroup } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import Calculator from '../../../components/Calculator/Calculator';
import DatePicker from '../../../components/DatePicker/DatePicker';
import ScheduleRecurrence from '../types/ScheduleRecurrence';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './RecurringScheduleRecurrenceOptions.module.css';

const RecurringScheduleRecurrenceOptions = ({
  recurrence,
  endDate,
  numberOfTimes,
  remainingTimes,
  isDisabled,
  requiredLabel,
  onUpdateScheduleOptions,
}) => (
  <RadioButtonGroup
    value={recurrence}
    label="ScheduleRecurrence"
    hideLabel
    name="recurrence"
    onChange={handleRadioButtonChange('recurrence', onUpdateScheduleOptions)}
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
);

export default RecurringScheduleRecurrenceOptions;
