import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getWagePayItemModal } from '../../selectors/WagePayItemModalSelectors';
import AddWagePayItemTable from './AddWagePayItemTable';
import WageDetails from './WageDetails';
import WagePayItemModal from '../WagePayItemModal/WagePayItemModal';

const PayrollWageDetails = ({
  wagePayItemModal,
  onAddPayrollWagePayItem,
  onRemovePayrollWagePayItem,
  onPayrollWageDetailsChange,
  onPayrollWagePayBasisChange,
  onPayrollWageAnnualSalaryBlur,
  onPayrollWageHourlyRateBlur,
  onPayrollWageHoursInPayCycleBlur,
  onPayrollWageSelectedPayCycleChange,
  onOpenWagePayItemModal,
  wagePayItemModalListeners,
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
      { wagePayItemModal && <WagePayItemModal {...wagePayItemModalListeners} /> }
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
        />
      </FieldGroup>
    </>
  );
};

const mapStateToProps = state => ({
  wagePayItemModal: getWagePayItemModal(state),
});

export default connect(mapStateToProps)(PayrollWageDetails);
