import Cleave from 'cleave.js/react';
import React from 'react';
import classnames from 'classnames';

import FieldMessagePopup from '../../FieldMessagePopup/FieldMessagePopup';

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
  ...inputBoxProps
}) => (
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
        className={classnames('form-control', className, {
          'text-align-center': textAlign === 'center',
          'text-align-right': textAlign === 'right',
        })}
      />
    )}
  />
);

export default Input;
