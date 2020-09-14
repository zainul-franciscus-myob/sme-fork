import { FieldGroup, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import QuoteDetailElementId from '../types/QuoteDetailElementId';
import QuoteHistory from './history/QuoteHistory';

const MoreInformation = ({ onAccordionToggle, onReferenceNoClick }) => (
  <StandardTemplate sticky="none">
    <FieldGroup
      label={
        <span id={QuoteDetailElementId.ACTIVITY_HISTORY_ELEMENT_ID}>
          More information
        </span>
      }
    >
      <QuoteHistory
        onAccordionToggle={onAccordionToggle}
        onReferenceNoClick={onReferenceNoClick}
      />
    </FieldGroup>
  </StandardTemplate>
);

export default MoreInformation;
