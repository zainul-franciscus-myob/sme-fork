import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import AddWagePayItemTable from './AddWagePayItemTable';
import WageDetails from './WageDetails';

const PayrollWageDetails = ({
  onAddPayrollWagePayItem,
  onRemovePayrollWagePayItem,
  onPayrollWageDetailsChange,
  onPayrollWagePayBasisChange,
  onPayrollWageAnnualSalaryBlur,
  onPayrollWageHourlyRateBlur,
  onPayrollWageHoursInPayCycleBlur,
  onPayrollWageSelectedPayCycleChange,
  onOpenWagePayItemModal,
  onAddPayItemComboBlur,
  onAddPayItemComboClick,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Allocated wage pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the relevant wage pay items for this employee.
      </Tooltip>
    </div>
  );

  return (
    <>
      <WageDetails
        onPayrollWageDetailsChange={onPayrollWageDetailsChange}
        onPayrollWagePayBasisChange={onPayrollWagePayBasisChange}
        onPayrollWageAnnualSalaryBlur={onPayrollWageAnnualSalaryBlur}
        onPayrollWageHourlyRateBlur={onPayrollWageHourlyRateBlur}
        onPayrollWageHoursInPayCycleBlur={onPayrollWageHoursInPayCycleBlur}
        onPayrollWageSelectedPayCycleChange={onPayrollWageSelectedPayCycleChange}
      />
      <hr />
      <FieldGroup label={fieldGroupLabel}>
        <AddWagePayItemTable
          onAddWagePayItem={onAddPayrollWagePayItem}
          onRemoveWagePayItem={onRemovePayrollWagePayItem}
          onOpenWagePayItemModal={onOpenWagePayItemModal}
          onAddPayItemComboClick={onAddPayItemComboClick}
          onAddPayItemComboBlur={onAddPayItemComboBlur}
        />
      </FieldGroup>
    </>
  );
};

export default PayrollWageDetails;
