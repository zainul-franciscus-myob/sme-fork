import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getDeductionPayItemModal } from '../selectors/DeductionPayItemModalSelectors';
import { getExpensePayItemModal } from '../selectors/ExpensePayItemModalSelectors';
import { getLeavePayItemModal } from '../selectors/LeavePayItemModalSelectors';
import { getSubTab } from '../../EmployeeDetailSelectors';
import { getSuperPayItemModal } from '../selectors/SuperPayItemModalSelectors';
import { getTaxPayItemModal } from '../selectors/PayrollTaxSelectors';
import { getWagePayItemModal } from '../selectors/WagePayItemModalSelectors';
import {
  payrollDetailsSubTabIds,
  payrollDetailsSubTabItems,
} from '../../tabItems';
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
  // TODO this needs to be moved
  onEmploymentPaySlipDeliveryChange,
  // TODO this needs to be moved
  onAddPayrollDeductionPayItem,
  // TODO this needs to be moved
  onRemovePayrollDeductionPayItem,
  // TODO this needs to be moved
  onAddPayrollExpensePayItem,
  // TODO this needs to be moved
  onRemovePayrollExpensePayItem,
  // TODO this needs to be moved
  onOpenExpensePayItemModal,
  // TODO this needs to be moved
  onPayrollLeaveListeners,
  // TODO this needs to be moved
  onPayrollStandardPayListeners,
  // TODO this needs to be moved
  onPayrollPayHistoryListeners,
  // TODO this needs to be moved
  onUpdatePayrollDetailSuperannuationDetails,
  // TODO this needs to be moved
  onAddPayrollSuperPayItem,
  // TODO this needs to be moved
  onRemovePayrollSuperPayItem,
  // TODO this needs to be moved
  onOpenDeductionPayItemModal,
  // TODO this needs to be moved
  wagePayItemModalListeners,
  // TODO this needs to be moved
  expensePayItemModalListeners,
  // TODO this needs to be moved
  onOpenWagePayItemModal,
  // TODO this needs to be moved
  deductionPayItemModalListeners,
  // TODO this needs to be moved
  onAddPayrollTaxPayItem,
  // TODO this needs to be moved
  onRemovePayrollTaxPayItem,
  // TODO this needs to be moved
  onPayrollTaxDetailsChange,
  // TODO this needs to be moved
  onPayrollTaxAmountBlur,
  // TODO this needs to be moved
  onPayrollWageDetailsChange,
  // TODO this needs to be moved
  onAddPayrollWagePayItem,
  // TODO this needs to be moved
  onRemovePayrollWagePayItem,
  // TODO this needs to be moved
  onPayrollWagePayBasisChange,
  // TODO this needs to be moved
  onPayrollWageAnnualSalaryBlur,
  // TODO this needs to be moved
  onPayrollWageHourlyRateBlur,
  // TODO this needs to be moved
  onPayrollWageHoursInPayCycleBlur,
  // TODO this needs to be moved
  onPayrollWageSelectedPayCycleChange,
  // TODO this needs to be moved
  onTaxPayItemClick,
  // TODO this needs to be moved
  taxPayItemModalListeners,
  // TODO this needs to be moved
  onOpenSuperFundModal,
  // TODO this needs to be moved
  superFundModalListeners,
  // TODO this needs to be moved
  onOpenSuperPayItemModal,
  // TODO this needs to be moved
  superPayItemModalListeners,
  // TODO this needs to be moved
  leavePayItemModalListeners,
  // TODO this needs to be moved
  onAddDeductionPayItemClick,
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
      onAddDeductionPayItemClick={onAddDeductionPayItemClick}
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
