import {
  Icons, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

const ServiceUnavailable = ({ tooltipMessage }) => (
  <Tooltip
    triggerContent={(
      <Icons.CloudDisconnected
        set="sm"
        title={tooltipMessage}
      />
    )}
  >
    {tooltipMessage}

  </Tooltip>
);

export default ServiceUnavailable;
