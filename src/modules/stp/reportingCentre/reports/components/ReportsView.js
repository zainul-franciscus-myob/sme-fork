import { MasterDetailTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDetailsLoadingState,
  getHasPayEventSelected,
  getIsTableLoading,
  getLoadingState,
  getPayEvents,
  getPayrollYears,
  getSelectedPayEvent,
  getSelectedPayrollYear,
  getShowDeclareAction,
} from '../ReportsSelector';
import PageView from '../../../../../components/PageView/PageView';
import ReportDetailView from './ReportDetail/ReportDetailView';
import ReportsFilter from './ReportsFilter';
import ReportsTable from './ReportsTable';
import ReportsTruncatedTable from './ReportsTruncatedTable';
import styles from './ReportsView.module.css';

const ReportsView = ({
  loadingState,
  isTableLoading,
  detailsLoadingState,
  payrollYears,
  payrollYear,
  payEvents,
  selectedPayEvent,
  onPayrollYearChange,
  hasRowSelected,
  onRowSelect,
  onClearSelected,
  showDeclareAction,
  onDeclare,
  onViewEmployeeReportClick,
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

  const table = hasRowSelected ? (
    <ReportsTruncatedTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payEvents={payEvents}
      onRowSelect={onRowSelect}
    />
  ) : (
    <ReportsTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payEvents={payEvents}
      onRowSelect={onRowSelect}
    />
  );

  const detail = (
    <ReportDetailView
      loadingState={detailsLoadingState}
      payEvent={selectedPayEvent}
      onClose={onClearSelected}
      showDeclareAction={showDeclareAction}
      onDeclare={onDeclare}
      onViewEmployeeReportClick={onViewEmployeeReportClick}
    />
  );

  const page = (
    <MasterDetailTemplate
      templateClassName={styles.reportsTemplate}
      containerClassName={styles.reportsContainer}
      pageHead={pageHeader}
      master={table}
      detail={detail}
      showDetail={hasRowSelected}
      detailWidth="47%"
    />
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  detailsLoadingState: getDetailsLoadingState(state),
  payrollYears: getPayrollYears(state),
  payrollYear: getSelectedPayrollYear(state),
  payEvents: getPayEvents(state),
  hasRowSelected: getHasPayEventSelected(state),
  selectedPayEvent: getSelectedPayEvent(state),
  showDeclareAction: getShowDeclareAction(state),
});

export default connect(mapStateToProps)(ReportsView);
