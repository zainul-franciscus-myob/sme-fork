import { FieldGroup, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import InvoiceHistory from './history/InvoiceHistory';

const MoreInformation = ({
  onAccordionClose,
  onAccordionOpen,
}) => (
  <StandardTemplate sticky="none">
    <FieldGroup label="More information">
      <InvoiceHistory onAccordionClose={onAccordionClose} onAccordionOpen={onAccordionOpen} />
    </FieldGroup>
  </StandardTemplate>
);

export default MoreInformation;
