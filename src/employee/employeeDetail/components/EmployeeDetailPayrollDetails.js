import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getSubTab } from '../selectors/EmployeeDetailSelectors';
import {
  payrollDetailsSubTabIds,
  payrollDetailsSubTabItems,
} from '../tabItems';
import EmploymentDetails from './EmploymentDetails';
import PayrollDeductionDetails from './PayrollDeductionDetails/PayrollDeductionDetails';
import PayrollDetailSuperannuation from './PayrollSuperDetails/PayrollDetailSuperannuation';
import PayrollLeaveDetail from './PayrollLeaveDetail';
import PayrollTaxDetails from './PayrollTaxDetails/PayrollTaxDetails';
import PayrollWageDetails from './PayrollWageDetails/PayrollWageDetails';

const EmployeeDetailPayrollDetails = ({
  selectedTab,
  onSubTabSelected,
  onEmploymentDetailsChange,
  onEmploymentPaySlipDeliveryChange,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
  onAddAllocatedLeaveItem,
  onRemoveAllocatedLeaveItem,
  onUpdateAllocatedLeaveItemCarryOver,
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onOpenDeductionPayItemModal,
  onAddPayrollTaxPayItem,
  onRemovePayrollTaxPayItem,
  onPayrollTaxDetailsChange,
  onPayrollTaxAmountBlur,
  onPayrollWageDetailsChange,
  onAddPayrollWagePayItem,
  onRemovePayrollWagePayItem,
  onPayrollWagePayBasisChange,
  onPayrollWageAnnualSalaryBlur,
  onPayrollWageHourlyRateBlur,
  onPayrollWageHoursInPayCycleBlur,
  onPayrollWageSelectedPayCycleChange,
  onTaxPayItemClick,
}) => {
  const Employment = () => (
    <EmploymentDetails
      onEmploymentDetailsChange={onEmploymentDetailsChange}
      onEmploymentPaySlipDeliveryChange={onEmploymentPaySlipDeliveryChange}
    />
  );

  const Leave = () => (
    <PayrollLeaveDetail
      onAddAllocatedLeaveItem={onAddAllocatedLeaveItem}
      onRemoveAllocatedLeaveItem={onRemoveAllocatedLeaveItem}
      onUpdateAllocatedLeaveItemCarryOver={onUpdateAllocatedLeaveItemCarryOver}
    />
  );

  const Deductions = () => (
    <PayrollDeductionDetails
      onAddPayrollDeductionPayItem={onAddPayrollDeductionPayItem}
      onRemovePayrollDeductionPayItem={onRemovePayrollDeductionPayItem}
      onOpenDeductionPayItemModal={onOpenDeductionPayItemModal}
    />
  );

  const Superannuation = () => (
    <PayrollDetailSuperannuation
      onUpdatePayrollDetailSuperannuationDetails={
        onUpdatePayrollDetailSuperannuationDetails
      }
      onAddPayrollSuperPayItem={onAddPayrollSuperPayItem}
      onRemovePayrollSuperPayItem={onRemovePayrollSuperPayItem}
    />
  );

  const Taxes = () => (
    <PayrollTaxDetails
      onAddPayrollTaxPayItem={onAddPayrollTaxPayItem}
      onRemovePayrollTaxPayItem={onRemovePayrollTaxPayItem}
      onPayrollTaxDetailsChange={onPayrollTaxDetailsChange}
      onPayrollTaxAmountBlur={onPayrollTaxAmountBlur}
      onTaxPayItemClick={onTaxPayItemClick}
    />
  );

  const Wages = () => (
    <PayrollWageDetails
      onAddPayrollWagePayItem={onAddPayrollWagePayItem}
      onRemovePayrollWagePayItem={onRemovePayrollWagePayItem}
      onPayrollWageDetailsChange={onPayrollWageDetailsChange}
      onPayrollWagePayBasisChange={onPayrollWagePayBasisChange}
      onPayrollWageAnnualSalaryBlur={onPayrollWageAnnualSalaryBlur}
      onPayrollWageHourlyRateBlur={onPayrollWageHourlyRateBlur}
      onPayrollWageHoursInPayCycleBlur={onPayrollWageHoursInPayCycleBlur}
      onPayrollWageSelectedPayCycleChange={onPayrollWageSelectedPayCycleChange}
    />
  );

  const Content = {
    [payrollDetailsSubTabIds.employmentDetails]: Employment,
    [payrollDetailsSubTabIds.salaryAndWages]: Wages,
    [payrollDetailsSubTabIds.leave]: Leave,
    [payrollDetailsSubTabIds.deductions]: Deductions,
    [payrollDetailsSubTabIds.superannuation]: Superannuation,
    [payrollDetailsSubTabIds.taxes]: Taxes,
  }[selectedTab];

  return (
    <Fragment>
      <Tabs
        items={payrollDetailsSubTabItems}
        selected={selectedTab}
        onSelected={onSubTabSelected}
      />
      <Content />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  selectedTab: getSubTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailPayrollDetails);
