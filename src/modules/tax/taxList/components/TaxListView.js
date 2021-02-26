import { Alert, Button, PageHead, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getCombineButtonLabel,
  getIsTaxCombineEnabled,
  getLoadingState,
  getPageHead,
} from '../taxListSelectors';
import PageView from '../../../../components/PageView/PageView';
import TaxListTable from './TaxListTable';

const TaxListView = ({
  alert,
  loadingState,
  pageHead,
  combineButtonLabel,
  isTaxCombineEnabled,
  onDismissAlert,
  onCombineButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const combineButton = isTaxCombineEnabled && (
    <Button type={'secondary'} onClick={onCombineButtonClick}>
      {combineButtonLabel}
    </Button>
  );

  const view = (
    <StandardTemplate
      sticky="none"
      pageHead={<PageHead title={pageHead}>{combineButton}</PageHead>}
      alert={alertComponent}
    >
      <TaxListTable />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  pageHead: getPageHead(state),
  combineButtonLabel: getCombineButtonLabel(state),
  isTaxCombineEnabled: getIsTaxCombineEnabled(state),
});

export default connect(mapStateToProps)(TaxListView);
