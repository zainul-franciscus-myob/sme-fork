import React from 'react';

import PayrollPayHistoryDetailsAllocatedPayItems from './PayrollPayHistoryDetailsTable';
import PayrollPayHistoryDetailsFilterOptions from './PayrollPayHistoryDetailsFilterOptions';

const PayrollPayHistoryDetails = ({
  listeners: { onFilterChange, onPayItemChange, onPayItemClick },
}) => (
  <>
    <PayrollPayHistoryDetailsFilterOptions onChange={onFilterChange} />
    <PayrollPayHistoryDetailsAllocatedPayItems
      onChange={onPayItemChange}
      onClick={onPayItemClick}
    />
  </>
);

export default PayrollPayHistoryDetails;
