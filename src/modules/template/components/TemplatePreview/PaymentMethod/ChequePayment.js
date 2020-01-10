import React from 'react';

import PaymentType from './PaymentType';

const ChequePayment = () => (
  <PaymentType name="Mail a cheque">
    <p>
      <strong>Cheques payable to</strong>
      <br />
      Paradise Closet
    </p>
    <p>
      <strong>Mail to</strong>
      <br />
      1 Yellowbrick Rd
      <br />
      Richmond VIC 3000
      <br />
      Australia
    </p>
  </PaymentType>
);

export default ChequePayment;
