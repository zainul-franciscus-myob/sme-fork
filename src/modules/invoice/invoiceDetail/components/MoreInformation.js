import { FieldGroup, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import InvoiceDetailElementId from '../types/InvoiceDetailElementId';
import InvoiceHistory from './history/InvoiceHistory';

const MoreInformation = ({
  onAccordionClose,
  onAccordionOpen,
  onClickOnRefNo,
}) => (
  <StandardTemplate sticky="none">
    <FieldGroup
      label={
        <span id={InvoiceDetailElementId.ACTIVITY_HISTORY_ELEMENT_ID}>
          More information
        </span>
      }
    >
      <InvoiceHistory
        onAccordionClose={onAccordionClose}
        onAccordionOpen={onAccordionOpen}
        onClickOnRefNo={onClickOnRefNo}
      />
    </FieldGroup>
  </StandardTemplate>
);

export default MoreInformation;
