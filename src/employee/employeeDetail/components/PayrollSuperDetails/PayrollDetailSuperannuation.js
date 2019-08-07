import React from 'react';

import PayrollDetailSuperannuationDetails from './PayrollDetailSuperannuationDetails';
import PayrollDetailSuperannuationTable from './PayrollDetailSuperannuationTable';

const PayrollDetailSuperannuation = ({
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
}) => (
  <>
    <PayrollDetailSuperannuationDetails
      onUpdatePayrollDetailSuperannuationDetails={
        onUpdatePayrollDetailSuperannuationDetails
      }
    />
    <hr />
    <PayrollDetailSuperannuationTable
      onAddPayrollSuperPayItem={onAddPayrollSuperPayItem}
      onRemovePayrollSuperPayItem={onRemovePayrollSuperPayItem}
    />
  </>
);

export default PayrollDetailSuperannuation;
