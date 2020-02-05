import {
  Card, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployees,
  getEmployeesCount,
  getGrossPaymentYtd,
  getIsRFBAEnabled,
  getIsRFBASubmitted,
  getIsTableLoading,
  getLoadingState,
  getPaygWithholdingYtd,
  getPayrollYears,
  getReportedRfba,
  getReportedSection57aRfba,
  getSelectedPayrollYear,
  getShouldShowFinaliseButton,
  getShouldShowRemoveFinalisationButton,
} from '../FinalisationSelector';
import FinalisationEmployeesTable from './FinalisationEmployeesTable';
import FinalisationHeader from './FinalisationHeader';
import PageView from '../../../../../components/PageView/PageView';

const FinalisationView = ({
  loadingState,
  isTableLoading,
  payrollYears,
  payrollYear,
  employees,
  grossPaymentYtd,
  reportedRfba,
  reportedSection57aRfba,
  paygWithholdingYtd,
  employeesCount,
  onIsRFBAEnabledClick,
  isRFBAEnabled,
  onPayrollYearChange,
  selectAllEmployees,
  selectEmployeesItem,
  onEmployeeChange,
  isRFBASubmitted,
  shouldShowFinaliseButton,
  shouldShowRemoveFinalisationButton,
}) => {
  const view = (
    <Card>
      <FinalisationHeader
        payrollYears={payrollYears}
        payrollYear={payrollYear}
        employees={employees}
        grossPaymentYtd={grossPaymentYtd}
        reportedRfba={reportedRfba}
        reportedSection57aRfba={reportedSection57aRfba}
        paygWithholdingYtd={paygWithholdingYtd}
        employeesCount={employeesCount}
        onIsRFBAEnabledClick={onIsRFBAEnabledClick}
        isRFBASubmitted={isRFBASubmitted}
        isRFBAEnabled={isRFBAEnabled}
        onPayrollYearChange={onPayrollYearChange}
      />
      <Separator />
      <FinalisationEmployeesTable
        employees={employees}
        isTableLoading={isTableLoading}
        selectAll={selectAllEmployees}
        selectItem={selectEmployeesItem}
        isRFBAEnabled={isRFBAEnabled}
        onEmployeeChange={onEmployeeChange}
        isRFBASubmitted={isRFBASubmitted}
        shouldShowFinaliseButton={shouldShowFinaliseButton}
        shouldShowRemoveFinalisationButton={shouldShowRemoveFinalisationButton}
      />
    </Card>
  );

  return (
    <PageView loadingState={loadingState} view={view} />
  );
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  employeesCount: getEmployeesCount(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  employees: getEmployees(state),
  grossPaymentYtd: getGrossPaymentYtd(state),
  reportedRfba: getReportedRfba(state),
  reportedSection57aRfba: getReportedSection57aRfba(state),
  paygWithholdingYtd: getPaygWithholdingYtd(state),
  isRFBAEnabled: getIsRFBAEnabled(state),
  isRFBASubmitted: getIsRFBASubmitted(state),
  shouldShowFinaliseButton: getShouldShowFinaliseButton(state),
  shouldShowRemoveFinalisationButton: getShouldShowRemoveFinalisationButton(state),
});

export default connect(mapStateToProps)(FinalisationView);
