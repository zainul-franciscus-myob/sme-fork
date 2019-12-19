import { FieldGroup, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import InvoiceHistory from './history/InvoiceHistory';

const MoreInformation = ({
  onAccordionClose,
  onAccordionOpen,
  onClickOnRefNo,
}) => (
  <StandardTemplate sticky="none">
    <FieldGroup label="More information">
      <InvoiceHistory
        onAccordionClose={onAccordionClose}
        onAccordionOpen={onAccordionOpen}
        onClickOnRefNo={onClickOnRefNo}
      />
    </FieldGroup>
  </StandardTemplate>
);

export default MoreInformation;
