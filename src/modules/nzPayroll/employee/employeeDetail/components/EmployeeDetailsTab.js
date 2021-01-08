import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMainTab } from '../EmployeeDetailNzSelectors';
import { tabItems } from '../tabItems';

const EmployeeDetailsTab = ({ mainTab, onMainTabSelected }) => (
  <Tabs selected={mainTab} items={tabItems} onSelected={onMainTabSelected} />
);

const mapStateToProps = (state) => ({
  mainTab: getMainTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailsTab);
