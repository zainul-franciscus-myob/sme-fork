import { MasterDetailTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../../PaydayFilingSelectors';
import {
  getPayrollYears,
  getSelectedPayrollYear,
} from '../EiSubmissionsSelector';
import EiSubmissionsFilter from './EiSubmissionsFilter';
import PageView from '../../../../../../components/PageView/PageView';
import styles from './EiSubmissionsView.module.css';

const EiSubmissionsView = ({
  loadingState,
  payrollYears,
  selectedPayrollYear,
  onPayrollYearChange,
  onRefreshClick,
}) => {
  const pageHeader = (
    <EiSubmissionsFilter
      payrollYears={payrollYears}
      selectedPayrollYear={selectedPayrollYear}
      onPayrollYearChange={onPayrollYearChange}
      onRefreshClick={onRefreshClick}
    />
  );

  const page = (
    <MasterDetailTemplate
      templateClassName={styles.eiSubmissionsTemplate}
      containerClassName={styles.eiSubmissionsContainer}
      pageHead={pageHeader}
      detailWidth="47%"
    />
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  payrollYears: getPayrollYears(state),
  selectedPayrollYear: getSelectedPayrollYear(state),
});

export default connect(mapStateToProps)(EiSubmissionsView);
