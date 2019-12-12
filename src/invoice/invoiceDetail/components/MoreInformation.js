import { FieldGroup, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import InvoiceHistory from './history/InvoiceHistory';

const MoreInformation = () => (
  <StandardTemplate sticky="none">
    <FieldGroup label="More information">
      <InvoiceHistory />
    </FieldGroup>
  </StandardTemplate>
);

export default MoreInformation;
