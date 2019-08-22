import React from 'react';

import PayrollStandardPayDetailsAllocatedPayItems from './PayrollStandardPayDetailsTable';
import PayrollStandardPayDetailsBasePay from './PayrollStandardPayDetailsBasePay';

const PayrollStandardPayDetails = ({
  listeners: {
    onDetailChange,
    onPayItemChange,
    onPayItemBlur,
    onPayItemClick,
  },
}) => (
    <>
      <PayrollStandardPayDetailsBasePay onChange={onDetailChange} />
      <hr />
      <PayrollStandardPayDetailsAllocatedPayItems
        onChange={onPayItemChange}
        onBlur={onPayItemBlur}
        onClick={onPayItemClick}
      />
    </>
);

export default PayrollStandardPayDetails;
