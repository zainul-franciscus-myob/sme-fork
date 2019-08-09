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

const SalaryAndWages = () => (
  <div>Salary and wages is under construction, please come back later</div>
);

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

  const Content = {
    [payrollDetailsSubTabIds.employmentDetails]: Employment,
    [payrollDetailsSubTabIds.salaryAndWages]: SalaryAndWages,
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
