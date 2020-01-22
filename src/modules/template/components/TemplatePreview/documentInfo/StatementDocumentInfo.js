import React from 'react';

import DocumentInfo from './DocumentInfo';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

const StatementDocumentInfo = () => (
  <DocumentInfo
    title="Statement"
    items={[{ name: 'Statement date', value: formatSlashDate(Date.now()) }]}
  />
);

export default StatementDocumentInfo;
