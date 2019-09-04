import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getDeductionPayItemModal } from '../selectors/DeductionPayItemModalSelectors';
import { getExpensePayItemModal } from '../selectors/ExpensePayItemModalSelectors';
import { getLeavePayItemModal } from '../selectors/LeavePayItemModalSelectors';
import { getSubTab } from '../selectors/EmployeeDetailSelectors';
import { getSuperPayItemModal } from '../selectors/SuperPayItemModalSelectors';
import { getTaxPayItemModal } from '../selectors/PayrollTaxSelectors';
import { getWagePayItemModal } from '../selectors/WagePayItemModalSelectors';
import {
  payrollDetailsSubTabIds,
  payrollDetailsSubTabItems,
} from '../tabItems';
import DeductionPayItemModal from './DeductionPayItemModal/DeductionPayItemModal';
import EmploymentDetails from './EmploymentDetails';
import ExpensePayItemModal from './ExpensePayItemModal/ExpensePayItemModal';
import LeavePayItemModal from './LeavePayItemModal/LeavePayItemModal';
import PayrollDeductionDetails from './PayrollDeductionDetails/PayrollDeductionDetails';
import PayrollDetailSuperannuation from './PayrollSuperDetails/PayrollDetailSuperannuation';
import PayrollExpenseDetails from './PayrollExpenseDetails/PayrollExpenseDetails';
import PayrollLeaveDetail from './PayrollLeaveDetail';
import PayrollPayHistoryDetails from './PayrollPayHistoryDetails/PayrollPayHistoryDetails';
import PayrollStandardPayDetails from './PayrollStandardPayDetails/PayrollStandardPayDetails';
import PayrollTaxDetails from './PayrollTaxDetails/PayrollTaxDetails';
import PayrollWageDetails from './PayrollWageDetails/PayrollWageDetails';
import SuperPayItemModal from './SuperPayItemModal/SuperPayItemModal';
import TaxPayItemModal from './PayrollTaxDetails/TaxPayItemModal';
import WagePayItemModal from './WagePayItemModal/WagePayItemModal';

const EmployeeDetailPayrollDetails = ({
  selectedTab,
  leavePayItemModal,
  deductionPayItemModal,
  expensePayItemModal,
  superPayItemModal,
  taxPayItemModal,
  wagePayItemModal,
  onSubTabSelected,
  onEmploymentDetailsChange,
  onEmploymentPaySlipDeliveryChange,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
  onAddPayrollExpensePayItem,
  onRemovePayrollExpensePayItem,
  onOpenExpensePayItemModal,
  onPayrollLeaveListeners,
  onPayrollStandardPayListeners,
  onPayrollPayHistoryListeners,
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onOpenDeductionPayItemModal,
  wagePayItemModalListeners,
  expensePayItemModalListeners,
  onOpenWagePayItemModal,
  deductionPayItemModalListeners,
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
  taxPayItemModalListeners,
  onOpenSuperFundModal,
  superFundModalListeners,
  onOpenSuperPayItemModal,
  superPayItemModalListeners,
  leavePayItemModalListeners,
}) => {
  const Employment = () => (
    <EmploymentDetails
      onEmploymentDetailsChange={onEmploymentDetailsChange}
      onEmploymentPaySlipDeliveryChange={onEmploymentPaySlipDeliveryChange}
    />
  );

  const Leave = () => (
    <PayrollLeaveDetail
      onPayrollLeaveListeners={onPayrollLeaveListeners}
      leavePayItemModalListeners={leavePayItemModalListeners}
    />
  );

  const Deductions = () => (
    <PayrollDeductionDetails
      onAddPayrollDeductionPayItem={onAddPayrollDeductionPayItem}
      onRemovePayrollDeductionPayItem={onRemovePayrollDeductionPayItem}
      onOpenDeductionPayItemModal={onOpenDeductionPayItemModal}
    />
  );

  const Expenses = () => (
    <PayrollExpenseDetails
      onAddPayrollExpensePayItem={onAddPayrollExpensePayItem}
      onRemovePayrollExpensePayItem={onRemovePayrollExpensePayItem}
      onOpenExpensePayItemModal={onOpenExpensePayItemModal}
    />
  );

  const Superannuation = () => (
    <PayrollDetailSuperannuation
      onUpdatePayrollDetailSuperannuationDetails={
        onUpdatePayrollDetailSuperannuationDetails
      }
      onAddPayrollSuperPayItem={onAddPayrollSuperPayItem}
      onRemovePayrollSuperPayItem={onRemovePayrollSuperPayItem}
      onOpenSuperFundModal={onOpenSuperFundModal}
      superFundModalListeners={superFundModalListeners}
      onOpenSuperPayItemModal={onOpenSuperPayItemModal}
    />
  );

  const Taxes = () => (
    <PayrollTaxDetails
      onAddPayrollTaxPayItem={onAddPayrollTaxPayItem}
      onRemovePayrollTaxPayItem={onRemovePayrollTaxPayItem}
      onPayrollTaxDetailsChange={onPayrollTaxDetailsChange}
      onPayrollTaxAmountBlur={onPayrollTaxAmountBlur}
      onTaxPayItemClick={onTaxPayItemClick}
      taxPayItemModalListeners={taxPayItemModalListeners}
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
      onOpenWagePayItemModal={onOpenWagePayItemModal}
      wagePayItemModalListeners={wagePayItemModalListeners}
    />
  );

  const StandardPay = () => (
    <PayrollStandardPayDetails listeners={onPayrollStandardPayListeners} />
  );

  const PayHistory = () => (
    <PayrollPayHistoryDetails listeners={onPayrollPayHistoryListeners} />
  );

  const Content = {
    [payrollDetailsSubTabIds.employmentDetails]: Employment,
    [payrollDetailsSubTabIds.salaryAndWages]: Wages,
    [payrollDetailsSubTabIds.leave]: Leave,
    [payrollDetailsSubTabIds.deductions]: Deductions,
    [payrollDetailsSubTabIds.expenses]: Expenses,
    [payrollDetailsSubTabIds.superannuation]: Superannuation,
    [payrollDetailsSubTabIds.taxes]: Taxes,
    [payrollDetailsSubTabIds.standardPay]: StandardPay,
    [payrollDetailsSubTabIds.payHistory]: PayHistory,
  }[selectedTab];

  return (
    <Fragment>
      <Tabs
        items={payrollDetailsSubTabItems}
        selected={selectedTab}
        onSelected={onSubTabSelected}
      />
      <Content />
      {leavePayItemModal && <LeavePayItemModal {...leavePayItemModalListeners} />}
      {deductionPayItemModal && <DeductionPayItemModal {...deductionPayItemModalListeners} />}
      {superPayItemModal && <SuperPayItemModal {...superPayItemModalListeners} />}
      {taxPayItemModal && <TaxPayItemModal {...taxPayItemModalListeners} />}
      {expensePayItemModal && <ExpensePayItemModal {...expensePayItemModalListeners} />}
      {wagePayItemModal && <WagePayItemModal {...wagePayItemModalListeners} />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  selectedTab: getSubTab(state),
  leavePayItemModal: getLeavePayItemModal(state),
  deductionPayItemModal: getDeductionPayItemModal(state),
  expensePayItemModal: getExpensePayItemModal(state),
  superPayItemModal: getSuperPayItemModal(state),
  taxPayItemModal: getTaxPayItemModal(state),
  wagePayItemModal: getWagePayItemModal(state),
});

export default connect(mapStateToProps)(EmployeeDetailPayrollDetails);
