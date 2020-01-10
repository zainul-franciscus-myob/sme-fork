import React from 'react';

import Footer from './Footer';

const QuoteFooter = () => (
  <Footer
    items={[
      { title: 'Quote no.', content: '00000001' },
      { title: 'Total amount', content: '$941.00' },
    ]}
  />
);

export default QuoteFooter;
