import {
  BaseTemplate,
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCurrentSubTab,
  getEmployeeFullName,
  getLoadingState,
  getMainTab,
} from '../EmployeeDetailNzSelectors';
import { tabItems } from '../tabItems';
import PageView from '../../../../../components/PageView/PageView';

const CardBody = ({
  subModules, mainTab, subTab, onSubTabSelected,
}) => {
  const tab = tabItems.find(({ id }) => id === mainTab);
  if (tab?.subTabs) {
    return <>
      <Tabs
        onSelected={sub => onSubTabSelected(mainTab, sub)}
        selected={subTab}
        items={tab.subTabs}
      />
      {subModules[subTab]?.getView()}
    </>;
  }
  return subModules[mainTab]?.getView();
};

const EmployeeDetailsNzView = ({
  loadingState,
  pageHeadTitle,
  subModules,
  onMainTabSelected,
  onSubTabSelected,
  mainTab,
  subTab,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title={pageHeadTitle} />
      <Tabs
        selected={mainTab}
        items={tabItems}
        onSelected={onMainTabSelected}
      />
      <Card>
        <CardBody
          subModules={subModules}
          mainTab={mainTab}
          subTab={subTab}
          onSubTabSelected={onSubTabSelected}
        />
      </Card>
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  pageHeadTitle: getEmployeeFullName(state),
  mainTab: getMainTab(state),
  subTab: getCurrentSubTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailsNzView);
