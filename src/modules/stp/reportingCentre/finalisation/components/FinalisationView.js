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
  getIsRFBALocked,
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
  isRFBALocked,
  shouldShowFinaliseButton,
  shouldShowRemoveFinalisationButton,
  onFinaliseClick,
  onRemoveFinalisationClick,
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
        isRFBALocked={isRFBALocked}
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
        shouldShowFinaliseButton={shouldShowFinaliseButton}
        shouldShowRemoveFinalisationButton={shouldShowRemoveFinalisationButton}
        onFinaliseClick={onFinaliseClick}
        onRemoveFinalisationClick={onRemoveFinalisationClick}
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
  isRFBALocked: getIsRFBALocked(state),
  shouldShowFinaliseButton: getShouldShowFinaliseButton(state),
  shouldShowRemoveFinalisationButton: getShouldShowRemoveFinalisationButton(state),
});

export default connect(mapStateToProps)(FinalisationView);
