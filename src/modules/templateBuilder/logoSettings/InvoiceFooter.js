import { addMonths } from 'date-fns';
import React from 'react';

import Footer from '../../template/components/TemplatePreview/footer/Footer';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';

const InvoiceFooter = () => (
  <Footer
    items={[
      { title: 'Invoice no.', content: 'IV000000001' },
      { title: 'Due date', content: formatSlashDate(addMonths(Date.now(), 1)) },
      { title: 'Balance due', content: '$10.00' },
    ]}
  />
);

export default InvoiceFooter;
