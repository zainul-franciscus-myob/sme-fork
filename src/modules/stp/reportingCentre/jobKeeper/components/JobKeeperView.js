import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveSort,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../JobKeeperSelector';
import JobKeeperFilter from './JobKeeperFilter';
import JobKeeperTable from './JobKeeperTable';
import PageView from '../../../../../components/PageView/PageView';

const JobKeeperView = ({
  payrollYears,
  payrollYear,
}) => {
  const jobKeeperTable = (<JobKeeperTable />);

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
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  activeSort: getActiveSort(state),
});

export default connect(mapStateToProps)(JobKeeperView);
