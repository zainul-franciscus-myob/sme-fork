import { Alert, Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState } from '../JobMakerSelector';
import JobMakerLanding from './JobMakerLanding';
import PageView from '../../../../../components/PageView/PageView';

const JobMakerView = ({ loadingState, alert, featureToggles }) => {
  const alertComponent = alert && (
    <Alert type={alert.type}>{alert.message}</Alert>
  );

  const view = featureToggles.isJobMakerDeclarationEnabled ? (
    <Card>{alertComponent}</Card>
  ) : (
    <JobMakerLanding />
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(JobMakerView);
