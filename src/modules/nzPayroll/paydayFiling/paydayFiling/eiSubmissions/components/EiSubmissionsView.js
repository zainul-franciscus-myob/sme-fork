import { MasterDetailTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableLoading,
  getPayRuns,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../EiSubmissionsSelector';
import { getLoadingState } from '../../PaydayFilingSelectors';
import EiSubmissionsFilter from './EiSubmissionsFilter';
import EiSubmissionsTable from './EiSubmissionsTable';
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
  onRowSelect = () => {},
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
      columnName: 'PAYG and/or schedular tax ($)',
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

  const table = (
    <EiSubmissionsTable
      tableConfig={tableConfig}
      isTableLoading={isTableLoading}
      payRuns={payRuns}
      onRowSelect={onRowSelect}
    />
  );

  const page = (
    <MasterDetailTemplate
      templateClassName={styles.eiSubmissionsTemplate}
      containerClassName={styles.eiSubmissionsContainer}
      pageHead={pageHeader}
      master={table}
      detailWidth="47%"
    />
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  payrollYears: getPayrollYears(state),
  selectedPayrollYear: getSelectedPayrollYear(state),
  isTableLoading: getIsTableLoading(state),
  payRuns: getPayRuns(state),
});

export default connect(mapStateToProps)(EiSubmissionsView);
