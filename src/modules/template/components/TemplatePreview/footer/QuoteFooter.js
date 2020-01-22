import React from 'react';

import { SaleLayout } from '../../../templateOptions';
import Footer from './Footer';

const QuoteFooter = ({ saleLayout }) => (
  <Footer
    items={[
      { title: 'Quote no.', content: '00000195' },
      { title: 'Total amount', content: saleLayout === SaleLayout.Service ? '$190.00' : '$98.05' },
    ]}
  />
);

export default QuoteFooter;
