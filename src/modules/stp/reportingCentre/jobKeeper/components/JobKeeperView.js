import { Alert, BaseTemplate, Button, ButtonRow } from '@myob/myob-widgets';
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
import styles from './JobKeeperView.module.css';

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
      {featureToggles && featureToggles.isJobKeeper2Enabled && (
        <div testId="test-new-JK-alert">
          <Alert type="warning">
            <p>
              <b>Employee JobKeeper eligibility and payment rate changes</b>
            </p>
            <p>
              You now need to choose the payment rate you&apos;re claiming for
              each eligible employee.&nbsp;
              <a
                href="https://www.ato.gov.au/General/JobKeeper-Payment/Employers/Your-eligible-employees/"
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
