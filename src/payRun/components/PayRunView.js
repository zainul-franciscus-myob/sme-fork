import { Alert, BaseTemplate, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getStep } from '../selectors/PayRunSelectors';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import PayRunActions from './PayRunActions';
import StartPayRunView from './StartPayRunView';

const PayRunView = ({
  isLoading,
  alert,
  step,
  onDismissAlert,
  onNextButtonClick,
  onPayPeriodChange,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const stepView = [
    <StartPayRunView
      onPayPeriodChange={onPayPeriodChange}
    />,
    <div>Step 2 - WIP</div>,
  ][step];

  const title = [
    'Create pay run',
  ][step];

  const view = (
    <BaseTemplate>
      <PageHead title={title} />
      { alertComponent }
      { stepView }
      <PayRunActions
        onNextButtonClick={onNextButtonClick}
      />
    </BaseTemplate>
  );

  return isLoading ? <LoadingPageState /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  step: getStep(state),
});

export default connect(mapStateToProps)(PayRunView);
