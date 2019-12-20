import { Field } from '@myob/myob-widgets';
import Cleave from 'cleave.js/react';
import React from 'react';
import classnames from 'classnames';

import styles from './AutoFormatter.module.css';

const Input = ({
  label,
  id,
  textAlign,
  hideLabel,
  labelAccessory,
  errorMessage,
  errorMessageInline,
  className,
  width,
  requiredLabel,
  ...inputBoxProps
}) => (
  <Field
    label={label}
    id={id}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    errorMessage={errorMessage}
    errorMessageInline={errorMessageInline}
    requiredLabel={requiredLabel}
    renderField={({ errorId, ...props }) => (
      <Cleave
        {...props}
        {...inputBoxProps}
        className={classnames('form-control', className, {
          'text-align-center': textAlign === 'center',
          'text-align-right': textAlign === 'right',
          [styles.xs]: width === 'xs',
          [styles.sm]: width === 'sm',
          [styles.md]: width === 'md',
          [styles.lg]: width === 'lg',
          [styles.xl]: width === 'xl',
        })}
      />
    )}
  />
);

export default Input;
