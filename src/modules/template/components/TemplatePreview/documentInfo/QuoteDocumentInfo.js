import { addDays } from 'date-fns';
import React from 'react';

import DocumentInfo from './DocumentInfo';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

const QuoteDocumentInfo = () => (
  <DocumentInfo
    title="Quote"
    items={[
      { name: 'Quote number', value: '00000195' },
      { name: 'Issue date', value: formatSlashDate(Date.now()) },
      { name: 'Expiry date', value: formatSlashDate(addDays(Date.now(), 10)) },
    ]}
  />
);

export default QuoteDocumentInfo;
