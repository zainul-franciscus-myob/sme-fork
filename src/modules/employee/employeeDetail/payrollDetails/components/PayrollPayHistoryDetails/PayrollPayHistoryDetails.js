import React from 'react';

import PayrollPayHistoryDetailsAllocatedPayItems from './PayrollPayHistoryDetailsTable';
import PayrollPayHistoryDetailsFilterOptions from './PayrollPayHistoryDetailsFilterOptions';

const PayrollPayHistoryDetails = ({
  listeners: {
    onFilterChange,
    onPayItemChange,
    onPayItemBlur,
    onPayItemClick,
  },
}) => (
  <>
    <PayrollPayHistoryDetailsFilterOptions onChange={onFilterChange} />
    <PayrollPayHistoryDetailsAllocatedPayItems
      onChange={onPayItemChange}
      onBlur={onPayItemBlur}
      onClick={onPayItemClick}
    />
  </>
);

export default PayrollPayHistoryDetails;
