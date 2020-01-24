import { RadioButton } from '@myob/myob-widgets';
import React from 'react';

const EtpModalRadioButton = ({
  code, label, checked, feelixProps,
}) => (
  <RadioButton
    {...feelixProps}
    value={code}
    checked={checked}
    label={(
      <span>
        <strong>{`Code ${code}`}</strong>
        {` - ${label}`}
      </span>
)}
  />
);

export default EtpModalRadioButton;
