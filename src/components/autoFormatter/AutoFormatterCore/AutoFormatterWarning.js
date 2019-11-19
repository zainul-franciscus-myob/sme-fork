import Cleave from 'cleave.js/react';
import React from 'react';
import classnames from 'classnames';

import FieldWarningPopup from '../../FieldWarningPopup/FieldWarningPopup';

const Input = ({
  label,
  id,
  textAlign,
  hideLabel,
  labelAccessory,
  errorMessage,
  errorMessageInline,
  warningBody,
  className,
  requiredLabel,
  ...inputBoxProps
}) => (
  <FieldWarningPopup
    label={label}
    id={id}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    errorMessage={errorMessage}
    errorMessageInline={errorMessageInline}
    warningBody={warningBody}
    requiredLabel={requiredLabel}
    renderField={({ errorId, ...props }) => (
      <Cleave
        {...props}
        {...inputBoxProps}
        className={classnames('form-control', className, {
          'text-align-center': textAlign === 'center',
          'text-align-right': textAlign === 'right',
        })}
      />
    )}
  />
);

export default Input;
