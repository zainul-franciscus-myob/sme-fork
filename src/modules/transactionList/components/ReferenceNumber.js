
import { Tooltip } from '@myob/myob-widgets';
import React from 'react';

const ReferenceNumber = ({ isSystem, link, referenceId }) => {
  if (isSystem) {
    return <Tooltip triggerContent={referenceId}>
       This general journal transaction is read only because it is an end of year adjustment.
      </Tooltip>;
  }

  if (!link) {
    return <Tooltip triggerContent={referenceId}>
      This transaction type can only be viewed and edited from your desktop AccountRight software.
    </Tooltip>;
  }

  return <a href={link}>{referenceId}</a>;
};

export default ReferenceNumber;
