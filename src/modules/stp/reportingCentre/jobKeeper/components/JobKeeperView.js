import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getEmployees,
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
}) => {
  const jobKeeperTable = (<JobKeeperTable
    employees={employees}
  />);

  const page = (<BaseTemplate>
    <JobKeeperFilter
      payrollYears={payrollYears}
      payrollYear={payrollYear}
    />
    {jobKeeperTable}
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
});

export default connect(mapStateToProps)(JobKeeperView);
