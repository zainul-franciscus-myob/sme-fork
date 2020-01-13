import { addMonths } from 'date-fns';
import React from 'react';

import DocumentInfo from './DocumentInfo';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';
import styles from './DocumentInfo.module.css';

const InvoiceDocumentInfo = () => (
  <DocumentInfo
    title="Tax invoice"
    items={[
      { name: 'Purchase order no', value: '123456789' },
      { name: 'Invoice number', value: 'IV00000195' },
      { name: 'Issue date', value: formatSlashDate(Date.now()) },
      { name: 'Due date', value: formatSlashDate(addMonths(Date.now(), 1)), className: styles.grey },
    ]}
  />
);

export default InvoiceDocumentInfo;
