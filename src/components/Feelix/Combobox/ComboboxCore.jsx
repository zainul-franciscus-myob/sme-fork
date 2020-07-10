import { Field } from '@myob/myob-widgets';
import React from 'react';

import ComboboxBox from './ComboboxBox';

const ComboboxCore = ({
  label,
  id,
  hideLabel,
  labelAccessory,
  requiredLabel,
  errorMessage,
  errorMessageInline,
  errorId,
  requiredId,
  width,
  ...comboboxCoreProps
}) => (
  <Field
    label={label}
    id={id}
    errorId={errorId}
    hideLabel={hideLabel}
    labelAccessory={labelAccessory}
    requiredLabel={requiredLabel}
    requiredId={requiredId}
    errorMessage={errorMessage}
    errorMessageInline={errorMessageInline}
    width={width}
    renderField={(props) => <ComboboxBox {...props} {...comboboxCoreProps} />}
  />
);

// eslint-disable-next-line
const { renderField, ...propsFromField } = Field.propTypes;

ComboboxCore.propTypes = {
  ...propsFromField,
  ...ComboboxBox.propTypes,
};

ComboboxCore.defaultProps = {
  ...ComboboxBox.defaultProps,
};

export default ComboboxCore;
