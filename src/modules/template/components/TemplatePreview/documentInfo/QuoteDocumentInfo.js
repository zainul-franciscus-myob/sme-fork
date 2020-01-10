import React from 'react';

import DocumentInfo from './DocumentInfo';

const QuoteDocumentInfo = () => (
  <DocumentInfo
    title="Quote"
    items={[
      { name: 'Quote number', value: 'IV00000123' },
      { name: 'Issue date', value: '12/09/2019' },
      { name: 'Expiry date', value: '12/10/2019' },
    ]}
  />
);

export default QuoteDocumentInfo;
