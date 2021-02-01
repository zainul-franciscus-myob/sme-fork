import { Alert, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState, getPageHead } from '../taxListSelectors';
import PageView from '../../../../components/PageView/PageView';
import TaxListTable from './TaxListTable';

const TaxListView = ({ alert, loadingState, pageHead, onDismissAlert }) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <StandardTemplate sticky="none" pageHead={pageHead} alert={alertComponent}>
      <TaxListTable />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(TaxListView);
