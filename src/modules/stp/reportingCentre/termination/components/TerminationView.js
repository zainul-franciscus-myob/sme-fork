import {
  BaseTemplate, Button, ButtonRow,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
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
  onEmployeeSelected,
  onTerminationDateChange,
  onTerminateEmployees,
  onUnterminateEmployee,
}) => {
  const tableConfig = {
    isSelected: {
      columnName: '', width: 'auto', cellRole: 'checkbox', valign: 'middle',
    },
    employeeName: {
      columnName: 'Employee', width: 'flex-1', valign: 'middle',
    },
    etpCount: {
      columnName: 'Employment termination payments (ETP)', width: 'flex-2', valign: 'middle',
    },
    terminationDate: {
      columnName: 'Employment end date', width: 'flex-1', valign: 'middle', textWrap: 'wrap',
    },
    removeTermination: {
      columnName: '', width: 'flex-1', valign: 'middle',
    },
  };

  const terminationTable = (
    <TerminationTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      employees={employees}
      onRowSelect={onEmployeeSelected}
      onTerminationDateChange={onTerminationDateChange}
      onUnterminateEmployee={onUnterminateEmployee}
    />
  );

  const actions = (
    <ButtonRow>
      <Button type="primary" onClick={onTerminateEmployees}>Notify the ATO</Button>
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

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  employees: getEmployees(state),
});

export default connect(mapStateToProps)(TerminationView);
