import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMainTab } from '../EmployeeDetailNzSelectors';

const CardBody = ({ subModules, mainTab }) => {
  return subModules[mainTab]?.getView();
};

const EmployeeDetailsTabBody = ({ mainTab, subModules }) => (
  <Card>
    <CardBody subModules={subModules} mainTab={mainTab} />
  </Card>
);

const mapStateToProps = (state) => ({
  mainTab: getMainTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailsTabBody);
