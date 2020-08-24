import { BaseTemplate, Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getEmployeeTierOptions,
  getEmployees,
  getFinalFortnightOptions,
  getFirstFortnightOptions,
  getIsTableLoading,
  getLoadingState,
  getPayrollYears,
  getSelectedPayrollYear,
  getUnsavedChangesModalIsOpen,
} from '../JobKeeperSelector';
import CancelModal from '../../../../../components/modal/CancelModal';
import JobKeeperFilter from './JobKeeperFilter';
import JobKeeperTable from './JobKeeperTable';
import PageView from '../../../../../components/PageView/PageView';

const JobKeeperView = ({
  payrollYears,
  payrollYear,
  employeeTierOptions,
  employees,
  finalFortnightOptions,
  firstFortnightOptions,
  onPayrollYearChange,
  onSort,
  activeSort,
  isTableLoading,
  onNotifyAtoClick,
  onEmployeeChange,
  onOpenJobKeeperReport,
  unsavedChangesModalIsOpen,
  unsavedChangesModalListeners,
  featureToggles,
}) => {
  const jobKeeperTable = (
    <JobKeeperTable
      featureToggles={featureToggles}
      employeeTierOptions={employeeTierOptions}
      employees={employees}
      firstFortnightOptions={firstFortnightOptions}
      finalFortnightOptions={finalFortnightOptions}
      onSort={onSort}
      isTableLoading={isTableLoading}
      activeSort={activeSort}
      onEmployeeChange={onEmployeeChange}
      onOpenJobKeeperReport={onOpenJobKeeperReport}
    />
  );

  const actions = (
    <ButtonRow>
      <Button type="primary" onClick={onNotifyAtoClick}>
        Notify the ATO
      </Button>
    </ButtonRow>
  );

  const page = (
    <BaseTemplate>
      {unsavedChangesModalIsOpen && (
        <CancelModal
          onConfirm={unsavedChangesModalListeners.onConfirm}
          onCancel={unsavedChangesModalListeners.onCancel}
        />
      )}
      <JobKeeperFilter
        payrollYears={payrollYears}
        payrollYear={payrollYear}
        onPayrollYearChange={onPayrollYearChange}
        onOpenJobKeeperReport={onOpenJobKeeperReport}
        featureToggles={featureToggles}
      />
      {jobKeeperTable}
      {actions}
    </BaseTemplate>
  );

  return <PageView view={page} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  employees: getEmployees(state),
  activeSort: getActiveSort(state),
  firstFortnightOptions: getFirstFortnightOptions(state),
  unsavedChangesModalIsOpen: getUnsavedChangesModalIsOpen(state),
  finalFortnightOptions: getFinalFortnightOptions(state),
  employeeTierOptions: getEmployeeTierOptions(state),
});

export default connect(mapStateToProps)(JobKeeperView);
