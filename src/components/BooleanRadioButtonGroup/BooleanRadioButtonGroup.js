import { RadioButton, RadioButtonGroup } from '@myob/myob-widgets';
import React from 'react';

const handleRadioButtonChange = (name, handler) => (e) => {
  const value = e.value === 'true';
  return handler({ key: name, value });
};

const BooleanRadioButtonGroup = ({
  name,
  value,
  trueLabel,
  falseLabel,
  handler,
  label,
  ...props
}) => (
  <RadioButtonGroup
    {...props}
    label={label}
    name={name}
    value={value}
    onChange={handleRadioButtonChange(name, handler)}
    renderRadios={({ ...feelixProps }) => [
      <RadioButton
        {...feelixProps}
        checked={value}
        key={trueLabel}
        value
        label={trueLabel}
      />,
      <RadioButton
        {...feelixProps}
        checked={!value}
        key={falseLabel}
        value={false}
        label={falseLabel}
      />,
    ]}
  />
);

export default BooleanRadioButtonGroup;
