import { DatePicker as FeelixDatePicker, Field, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import useOnBlur from './useOnBlur';

const containerId = 'issueDateContainer';

const DatePicker = ({
  value, disabled, disabledMessage, label, hideLabel, onSelect, onBlur, requiredLabel,
}) => {
  const { newOnBlur, newOnSelect } = useOnBlur({ onSelect, onBlur });

  const datePicker = (
    <div
      id={containerId}
      onBlur={newOnBlur}
    >
      <FeelixDatePicker
        value={value}
        name="issueDate"
        disabled={disabled}
        onSelect={newOnSelect}
        hideLabel
      />
    </div>
  );

  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      requiredLabel={requiredLabel}
      renderField={() => (
        disabled && disabledMessage
          ? <Tooltip
            triggerContent={datePicker}
          >
            {disabledMessage}
          </Tooltip>
          : datePicker
      )
      }
    />
  );
};

export default DatePicker;
