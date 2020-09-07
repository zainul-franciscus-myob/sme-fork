import { Alert, BaseTemplate, Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getEmployeeTierOptions,
  getEmployees,
  getFinalFortnightOptions,
  getFinalFortnightOptionsJK2,
  getFirstFortnightOptions,
  getFirstFortnightOptionsJK2,
  getIsTableLoading,
  getLoadingState,
  getPayrollYears,
  getSelectedPayrollYear,
  getShowInitWarning,
  getUnsavedChangesModalIsOpen,
} from '../JobKeeperSelector';
import CancelModal from '../../../../../components/modal/CancelModal';
import JobKeeperFilter from './JobKeeperFilter';
import JobKeeperTable from './JobKeeperTable';
import PageView from '../../../../../components/PageView/PageView';
import styles from './JobKeeperView.module.css';

const JobKeeperView = ({
  payrollYears,
  payrollYear,
  employeeTierOptions,
  employees,
  finalFortnightOptions,
  finalFortnightOptionsJK2,
  firstFortnightOptions,
  firstFortnightOptionsJK2,
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
  dismissInitWarning,
  showInitWarning,
  onOpenEmployeeBenefitReport,
}) => {
  const jobKeeperTable =
    featureToggles && featureToggles.isJobKeeper2Enabled ? (
      <JobKeeperTable
        featureToggles={featureToggles}
        employeeTierOptions={employeeTierOptions}
        employees={employees}
        firstFortnightOptions={firstFortnightOptionsJK2}
        finalFortnightOptions={finalFortnightOptionsJK2}
        onSort={onSort}
        isTableLoading={isTableLoading}
        activeSort={activeSort}
        onEmployeeChange={onEmployeeChange}
        onOpenJobKeeperReport={onOpenJobKeeperReport}
      />
    ) : (
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
    <BaseTemplate
      templateClassName={styles.jobkeeperTemplate}
      containerClassName={styles.jobkeeperContainer}
    >
      {unsavedChangesModalIsOpen && (
        <CancelModal
          onConfirm={unsavedChangesModalListeners.onConfirm}
          onCancel={unsavedChangesModalListeners.onCancel}
        />
      )}
      {featureToggles && featureToggles.isJobKeeper2Enabled && showInitWarning && (
        <div testId="test-new-JK-warning">
          <Alert type="warning" onDismiss={dismissInitWarning}>
            <p>
              <b>Employee JobKeeper eligibility and payment rate changes</b>
            </p>
            <p>
              You now need to choose the payment rate you&apos;re claiming for
              each eligible employee.&nbsp;
              <a
                href="https://help.myob.com/wiki/x/9ARMAw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.link}>
                  Calculate employee payment rate
                </span>
              </a>
            </p>
          </Alert>
        </div>
      )}
      <JobKeeperFilter
        payrollYears={payrollYears}
        payrollYear={payrollYear}
        onPayrollYearChange={onPayrollYearChange}
        onOpenJobKeeperReport={onOpenJobKeeperReport}
        featureToggles={featureToggles}
        onOpenEmployeeBenefitReport={onOpenEmployeeBenefitReport}
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
  firstFortnightOptionsJK2: getFirstFortnightOptionsJK2(state),
  unsavedChangesModalIsOpen: getUnsavedChangesModalIsOpen(state),
  finalFortnightOptions: getFinalFortnightOptions(state),
  finalFortnightOptionsJK2: getFinalFortnightOptionsJK2(state),
  employeeTierOptions: getEmployeeTierOptions(state),
  showInitWarning: getShowInitWarning(state),
});

export default connect(mapStateToProps)(JobKeeperView);
