import { DatePicker as FeelixDatePicker, Field, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../Icon/Icon';
import styles from './DatePicker.module.css';
import useOnBlur from './useOnBlur';

const containerId = 'issueDateContainer';

const DatePicker = ({
  name,
  value,
  disabled,
  disabledMessage,
  label,
  hideLabel,
  onSelect,
  onBlur,
  requiredLabel,
  displayWarning,
  warningMessage,
}) => {
  const { newOnBlur, newOnSelect } = useOnBlur({ onSelect, onBlur });

  const datePicker = (
    <div
      id={containerId}
      onBlur={newOnBlur}
      className={styles.datePicker}
    >
      <FeelixDatePicker
        value={value}
        name={name || 'issueDate'}
        onSelect={newOnSelect}
        hideLabel
        disabled={disabled}
      />
    </div>
  );

  const warningIcon = (
    <div className={styles.warningIcon}>
      <Tooltip
        className={styles.warningTooltip}
        triggerContent={<Icon.Warning />}
      >
        {warningMessage}
      </Tooltip>
    </div>
  );

  const disabledDatePickerContainer = (
    <Tooltip triggerContent={datePicker}>
      {disabledMessage}
    </Tooltip>
  );

  const datePickerContainer = (
    <div className={styles.datePickerContainer}>
      {datePicker}
      {displayWarning && warningMessage && warningIcon}
    </div>
  );

  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      requiredLabel={requiredLabel}
      renderField={() => (
        disabled && disabledMessage
          ? disabledDatePickerContainer
          : datePickerContainer
      )}
    />
  );
};

export default DatePicker;
