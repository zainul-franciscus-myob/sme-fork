import { Card, MasterDetailTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableLoading,
  getLoadingState,
  getPayEvents,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../ReportsSelector';
import PageView from '../../../../../components/PageView/PageView';
import ReportsFilter from './ReportsFilter';
import ReportsTable from './ReportsTable';
import styles from './ReportsView.module.css';

const ReportsView = ({
  loadingState,
  isTableLoading,
  payrollYears,
  payrollYear,
  payEvents,
  onPayrollYearChange,
}) => {
  const tableConfig = {
    payPeriod: { columnName: 'Pay period', width: '21rem', valign: 'middle' },
    paymentDate: { columnName: 'Date of payment', width: 'flex-1', valign: 'middle' },
    recordedDate: { columnName: 'Date recorded', width: '18rem', valign: 'middle' },
    employeeCount: {
      columnName: 'Employees', width: '10rem', valign: 'middle', align: 'right',
    },
    gross: {
      columnName: 'Gross payments ($)', width: '16rem', valign: 'middle', align: 'right',
    },
    tax: {
      columnName: 'PAYG Withholding ($)', width: '18rem', valign: 'middle', align: 'right',
    },
    status: { columnName: 'Status', width: 'flex-2', valign: 'middle' },
  };

  const pageHeader = (
    <ReportsFilter
      payrollYears={payrollYears}
      payrollYear={payrollYear}
      onPayrollYearChange={onPayrollYearChange}
    />
  );

  const table = (
    <ReportsTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payEvents={payEvents}
    />
  );

  const page = (
    <MasterDetailTemplate
      templateClassName={styles.reportsTemplate}
      containerClassName={styles.reportsContainer}
      pageHead={pageHeader}
      master={table}
      detail={<Card body={<div>Empty!</div>} />}
      showDetail={false}
    />
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  payEvents: getPayEvents(state),
});

export default connect(mapStateToProps)(ReportsView);
