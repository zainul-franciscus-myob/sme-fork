import Cleave from 'cleave.js/react';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import FieldMessagePopup from '../../FieldMessagePopup/FieldMessagePopup';

/**
 * #PROBLEM
 * If we enter value after a comma, for exmple update '1,000.00' to '12,000.00'
 * mouse pointer jumps to the end
 * #SOLUTION
 * when we call cleave.setRawValue, it update the value properly without mouse jumping
 * however it will trigger onChange event which only return value and rawValue
 * we don't need setRawValue to trigger onChange event
 * as setRawValue is trigger by onChange event
*/
const isActuallyAnEvent = e => Boolean(e.target.name);

const Input = ({
  label,
  id,
  textAlign,
  hideLabel,
  labelAccessory,
  errorMessage,
  errorMessageInline,
  warningBody,
  infoBody,
  className,
  requiredLabel,
  value,
  onChange,
  ...inputBoxProps
}) => {
  const [cleave, setCleave] = useState(null);

  useEffect(() => {
    if (!cleave) return;
    cleave.setRawValue(value);
  }, [cleave, value]);

  const cleaveOnChangeHandler = (e) => {
    if (isActuallyAnEvent(e)) {
      onChange(e);
    }
  };

  return (
    <FieldMessagePopup
      label={label}
      id={id}
      hideLabel={hideLabel}
      labelAccessory={labelAccessory}
      errorMessage={errorMessage}
      errorMessageInline={errorMessageInline}
      warningBody={warningBody}
      infoBody={infoBody}
      requiredLabel={requiredLabel}
      renderField={({ errorId, ...props }) => (
        <Cleave
          {...props}
          {...inputBoxProps}
          onChange={cleaveOnChangeHandler}
          onInit={setCleave}
          className={classnames('form-control', className, {
            'text-align-center': textAlign === 'center',
            'text-align-right': textAlign === 'right',
          })}
        />
      )}
    />
  );
};

export default Input;
