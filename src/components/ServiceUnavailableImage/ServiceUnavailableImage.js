import { Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';

const ServiceUnavailableImage = ({ tooltipMessage }) => (
  <Tooltip
    triggerContent={<Icons.CloudDisconnected set="sm" title={tooltipMessage} />}
  >
    {tooltipMessage}
  </Tooltip>
);

export default ServiceUnavailableImage;
