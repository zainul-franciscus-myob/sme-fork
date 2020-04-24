import {
  BaseTemplate,
  Button,
  ButtonRow,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getEmployees,
  getFinalFortnightOptions,
  getFirstFortnightOptions,
  getIsTableLoading,
  getLoadingState,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../JobKeeperSelector';
import JobKeeperFilter from './JobKeeperFilter';
import JobKeeperTable from './JobKeeperTable';
import PageView from '../../../../../components/PageView/PageView';

const JobKeeperView = ({
  payrollYears,
  payrollYear,
  employees,
  finalFortnightOptions,
  firstFortnightOptions,
  onPayrollYearChange,
  onSort,
  activeSort,
  isTableLoading,
  onNotifyAtoClick,
  onEmployeeChange,
}) => {
  const jobKeeperTable = (<JobKeeperTable
    employees={employees}
    firstFortnightOptions={firstFortnightOptions}
    finalFortnightOptions={finalFortnightOptions}
    onSort={onSort}
    isTableLoading={isTableLoading}
    activeSort={activeSort}
    onEmployeeChange={onEmployeeChange}
  />);

  const actions = (
    <ButtonRow>
      <Button type="primary" onClick={onNotifyAtoClick}>Notify the ATO</Button>
    </ButtonRow>
  );


  const page = (<BaseTemplate>
    <JobKeeperFilter
      payrollYears={payrollYears}
      payrollYear={payrollYear}
      onPayrollYearChange={onPayrollYearChange}
    />
    {jobKeeperTable}
    {actions}
  </BaseTemplate>);

  return (
    <PageView view={page} />
  );
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  employees: getEmployees(state),
  activeSort: getActiveSort(state),
  firstFortnightOptions: getFirstFortnightOptions(state),
  finalFortnightOptions: getFinalFortnightOptions(state),
});

export default connect(mapStateToProps)(JobKeeperView);
