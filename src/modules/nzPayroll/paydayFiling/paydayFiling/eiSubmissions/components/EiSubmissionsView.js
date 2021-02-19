import { MasterDetailTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasSelectedPayRun,
  getIsTableLoading,
  getPayRuns,
  getPayrollYears,
  getSelectedPayRun,
  getSelectedPayrollYear,
  getShouldDisplaySubmissionInfo,
} from '../EiSubmissionsSelector';
import { getLoadingState } from '../../PaydayFilingSelectors';
import EiSubmissionsDetailView from './EiSubmissionsDetailView';
import EiSubmissionsFilter from './EiSubmissionsFilter';
import EiSubmissionsTable from './EiSubmissionsTable';
import EiSubmissionsTruncatedTable from './EiSubmissionsTruncatedTable';
import PageView from '../../../../../../components/PageView/PageView';
import styles from './EiSubmissionsView.module.css';

const EiSubmissionsView = ({
  loadingState,
  payrollYears,
  selectedPayrollYear,
  onPayrollYearChange,
  onRefreshClick,
  isTableLoading,
  payRuns,
  hasRowSelected,
  onRowSelect,
  selectedPayRun,
  onViewPayRunReportClick = () => {},
  onClosePayRunDetails,
  shouldDisplaySubmissionInfo,
}) => {
  const tableConfig = {
    payPeriod: {
      columnName: 'Pay period',
      valign: 'middle',
    },
    payOnDate: {
      columnName: 'Pay on date',
      width: '16rem',
      valign: 'middle',
    },
    dateRecorded: {
      columnName: 'Date recorded',
      valign: 'middle',
    },
    totalPaye: {
      columnName: 'PAYE and/or schedular tax ($)',
      valign: 'middle',
      width: 'flex-1',

      align: 'right',
    },
    status: {
      columnName: 'Submitted to IR',
      valign: 'middle',
      width: '18rem',
      align: 'left',
    },
  };

  const pageHeader = (
    <EiSubmissionsFilter
      payrollYears={payrollYears}
      selectedPayrollYear={selectedPayrollYear}
      onPayrollYearChange={onPayrollYearChange}
      onRefreshClick={onRefreshClick}
    />
  );

  const table = hasRowSelected ? (
    <EiSubmissionsTruncatedTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payRuns={payRuns}
      onRowSelect={onRowSelect}
    />
  ) : (
    <EiSubmissionsTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payRuns={payRuns}
      onRowSelect={onRowSelect}
    />
  );

  const detail = (
    <EiSubmissionsDetailView
      payRun={selectedPayRun}
      onClose={onClosePayRunDetails}
      onViewPayRunReportClick={onViewPayRunReportClick}
      shouldDisplaySubmissionInfo={shouldDisplaySubmissionInfo}
    />
  );

  const page = (
    <MasterDetailTemplate
      templateClassName={styles.eiSubmissionsTemplate}
      containerClassName={styles.eiSubmissionsContainer}
      pageHead={pageHeader}
      master={table}
      detail={detail}
      showDetail={hasRowSelected}
      detailWidth="45%"
    />
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  payrollYears: getPayrollYears(state),
  selectedPayrollYear: getSelectedPayrollYear(state),
  hasRowSelected: getHasSelectedPayRun(state),
  isTableLoading: getIsTableLoading(state),
  payRuns: getPayRuns(state),
  selectedPayRun: getSelectedPayRun(state),
  shouldDisplaySubmissionInfo: getShouldDisplaySubmissionInfo(state),
});

export default connect(mapStateToProps)(EiSubmissionsView);
