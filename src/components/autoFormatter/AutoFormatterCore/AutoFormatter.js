// import { Field } from '@myob/myob-widgets';
import Cleave from 'cleave.js/react';
import React from 'react';
import classnames from 'classnames';

import Field from '../../Feelix/Field/Field';

const Input = ({
  label,
  id,
  textAlign,
  hideLabel,
  labelAccessory,
  errorMessage,
  errorMessageInline,
  warningMessage,
  warningMessageInline,
  className,
  ...inputBoxProps
}) => (
  <Field
    label={label}
    id={id}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    errorMessage={errorMessage}
    errorMessageInline={errorMessageInline}
    warningMessage={warningMessage}
    warningMessageInline={warningMessageInline}
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
