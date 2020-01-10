import React from 'react';

import DocumentInfo from './DocumentInfo';
import styles from './DocumentInfo.module.css';

const InvoiceDocumentInfo = () => (
  <DocumentInfo
    title="Tax invoice"
    items={[
      { name: 'Purchase order no', value: '123456789' },
      { name: 'Invoice number', value: 'IV00000195' },
      { name: 'Issue date', value: '12/09/2019' },
      { name: 'Due date', value: '12/10/2019', className: styles.grey },
    ]}
  />
);

export default InvoiceDocumentInfo;
