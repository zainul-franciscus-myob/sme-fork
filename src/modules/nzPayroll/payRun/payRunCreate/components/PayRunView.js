import { BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState, getStepKey } from '../PayRunSelectors';
import PageView from '../../../../../components/PageView/PageView';

const PayRunView = ({ stepViews, step, loadingState }) => {
  const view = <BaseTemplate>{stepViews[step]}</BaseTemplate>;

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  step: getStepKey(state),
});

export default connect(mapStateToProps)(PayRunView);
