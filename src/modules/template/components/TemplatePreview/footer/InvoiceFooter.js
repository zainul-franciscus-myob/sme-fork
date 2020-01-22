import { addMonths } from 'date-fns';
import React from 'react';

import { SaleLayout } from '../../../templateOptions';
import Footer from './Footer';
import formatSlashDate from '../../../../../common/valueFormatters/formatDate/formatSlashDate';

const InvoiceFooter = ({ saleLayout }) => (
  <Footer
    items={[
      { title: 'Invoice no.', content: 'IV00000195' },
      { title: 'Due date', content: formatSlashDate(addMonths(Date.now(), 1)) },
      { title: 'Balance due', content: saleLayout === SaleLayout.Service ? '$190.00' : '$98.05' },
    ]}
  />
);

export default InvoiceFooter;
