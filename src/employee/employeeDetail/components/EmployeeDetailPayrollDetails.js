import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getSubTab } from '../selectors/EmployeeDetailSelectors';
import { payrollDetailsSubTabIds, payrollDetailsSubTabItems } from '../tabItems';
import EmploymentDetails from './EmploymentDetails';
import PayrollDeductionDetails from './PayrollDeductionDetail';
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
  onAddPayrollTaxPayItem,
  onRemovePayrollTaxPayItem,
  onPayrollTaxDetailsChange,
  onPayrollTaxAmountBlur,
}) => {
  const Employment = () => (
    <EmploymentDetails
      onEmploymentDetailsChange={onEmploymentDetailsChange}
      onEmploymentPaySlipDeliveryChange={onEmploymentPaySlipDeliveryChange}
    />
  );

  const Deductions = () => (
    <PayrollDeductionDetails
      onAddPayrollDeductionPayItem={onAddPayrollDeductionPayItem}
      onRemovePayrollDeductionPayItem={onRemovePayrollDeductionPayItem}
    />
  );

  const Taxes = () => (
    <PayrollTaxDetails
      onAddPayrollTaxPayItem={onAddPayrollTaxPayItem}
      onRemovePayrollTaxPayItem={onRemovePayrollTaxPayItem}
      onPayrollTaxDetailsChange={onPayrollTaxDetailsChange}
      onPayrollTaxAmountBlur={onPayrollTaxAmountBlur}
    />
  );

  const Content = {
    [payrollDetailsSubTabIds.employmentDetails]: Employment,
    [payrollDetailsSubTabIds.salaryAndWages]: SalaryAndWages,
    [payrollDetailsSubTabIds.deductions]: Deductions,
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
