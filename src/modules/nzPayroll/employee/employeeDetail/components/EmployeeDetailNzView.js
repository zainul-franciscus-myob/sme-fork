import {
  BaseTemplate,
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeeFullName,
  getLoadingState,
} from '../EmployeeDetailNzSelectors';
import { mainTabItems } from '../tabItems';
import PageView from '../../../../../components/PageView/PageView';

const EmployeeDetailNzView = ({
  loadingState,
  pageHeadTitle,
  tabView,
}) => {
  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
    />
  );

  const view = (
    <BaseTemplate>
      <PageHead title={pageHeadTitle} />
      { subHeadTabs }
      <Card body={tabView.getView()} />
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  pageHeadTitle: getEmployeeFullName(state),
});

export default connect(mapStateToProps)(EmployeeDetailNzView);
