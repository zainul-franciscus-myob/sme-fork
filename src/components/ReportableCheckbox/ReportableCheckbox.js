import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import React from 'react';

const ReportableCheckbox = ({
  region,
  id,
  name,
  checked,
  disabled,
  onChange,
  labelAccessory,
  label,
}) => {
  const auView = (
    <CheckboxGroup
      hideLabel
      label={label}
      renderCheckbox={() => (
        <Checkbox
          id={id}
          name={name}
          label={label}
          labelAccessory={labelAccessory}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    />
  );

  return {
    au: auView,
    nz: <></>,
  }[region];
};

export default ReportableCheckbox;
