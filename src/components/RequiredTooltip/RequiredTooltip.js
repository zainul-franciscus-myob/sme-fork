import {
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

const RequiredTooltip = ({ label }) => (
  <span>
    {label}
    <Tooltip triggerContent="*">
      required
    </Tooltip>
  </span>
);

export default RequiredTooltip;
