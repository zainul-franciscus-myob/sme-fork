import { BaseTemplate, Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getEmployees,
  getIsTableLoading,
  getLoadingState,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../TerminationSelector';
import PageView from '../../../../../components/PageView/PageView';
import TerminationFilter from './TerminationFilter';
import TerminationTable from './TerminationTable';
import styles from './TerminationView.module.css';

const TerminationView = ({
  loadingState,
  isTableLoading,
  payrollYears,
  payrollYear,
  employees,
  onPayrollYearChange,
  onTerminationDateChange,
  onTerminateEmployees,
  onUnterminateEmployee,
  onSort,
  activeSort,
}) => {
  const terminationTable = (
    <TerminationTable
      isTableLoading={isTableLoading}
      employees={employees}
      onTerminationDateChange={onTerminationDateChange}
      onUnterminateEmployee={onUnterminateEmployee}
      onSort={onSort}
      activeSort={activeSort}
    />
  );

  const actions = (
    <ButtonRow>
      <Button type="primary" onClick={onTerminateEmployees}>
        Notify the ATO
      </Button>
    </ButtonRow>
  );

  const page = (
    <BaseTemplate containerClassName={styles.terminationContainer}>
      <TerminationFilter
        payrollYears={payrollYears}
        payrollYear={payrollYear}
        onPayrollYearChange={onPayrollYearChange}
      />
      {terminationTable}
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  employees: getEmployees(state),
  activeSort: getActiveSort(state),
});

export default connect(mapStateToProps)(TerminationView);
