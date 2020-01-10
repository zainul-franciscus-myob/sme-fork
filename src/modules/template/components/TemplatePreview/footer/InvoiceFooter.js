import React from 'react';

import Footer from './Footer';

const InvoiceFooter = () => (
  <Footer
    items={[
      { title: 'Invoice no.', content: '00000001' },
      { title: 'Balance due', content: '$941.00' },
    ]}
  />
);

export default InvoiceFooter;
