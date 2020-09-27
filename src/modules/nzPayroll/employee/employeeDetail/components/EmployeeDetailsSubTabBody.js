import { Card, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentSubTab, getMainTab } from '../EmployeeDetailNzSelectors';
import { tabItems } from '../tabItems';

const CardBody = ({ subModules, mainTab, subTab, onSubTabSelected }) => {
  const tab = tabItems.find(({ id }) => id === mainTab);
  if (tab?.subTabs) {
    return (
      <>
        <Tabs
          onSelected={(sub) => onSubTabSelected(mainTab, sub)}
          selected={subTab}
          items={tab.subTabs}
        />
        {subModules[subTab]?.getView()}
      </>
    );
  }
  return subModules[mainTab]?.getView();
};

const EmployeeDetailsSubTabBody = ({
  mainTab,
  subTab,
  subModules,
  onSubTabSelected,
}) => (
  <Card>
    <CardBody
      subModules={subModules}
      mainTab={mainTab}
      subTab={subTab}
      onSubTabSelected={onSubTabSelected}
    />
  </Card>
);

const mapStateToProps = (state) => ({
  mainTab: getMainTab(state),
  subTab: getCurrentSubTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailsSubTabBody);
