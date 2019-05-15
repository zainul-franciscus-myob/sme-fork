import { Field } from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import CleaveWrapper from './Cleave/CleaveWrapper';

const Input = ({
  label,
  id,
  textAlign,
  hideLabel,
  labelAccessory,
  errorMessage,
  className,
  ...inputBoxProps
}) => (
  <Field
    label={label}
    id={id}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    errorMessage={errorMessage}
    renderField={({ errorId, ...props }) => (
      <CleaveWrapper
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

Input.propTypes = {
  ...CleaveWrapper.propTypes,
};

Input.defaultProps = {
  ...CleaveWrapper.defaultProps,
};

export default Input;
