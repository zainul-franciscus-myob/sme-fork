import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getSubTab } from '../EmployeeDetailSelectors';
import { payrollDetailsSubTabIds, payrollDetailsSubTabItems } from '../tabItems';

const EmploymentDetails = () => (
  <div>Employment details is under construction, please come back later</div>
);
const SalaryAndWages = () => (
  <div>Salary and wages is under construction, please come back later</div>
);

const EmployeeDetailPayrollDetails = ({ selectedTab, onSubTabSelected }) => {
  const Content = {
    [payrollDetailsSubTabIds.employmentDetails]: EmploymentDetails,
    [payrollDetailsSubTabIds.salaryAndWages]: SalaryAndWages,
  }[selectedTab];

  return (
    <Fragment>
      <Tabs
        items={payrollDetailsSubTabItems}
        selected={selectedTab}
        onSelected={onSubTabSelected}
      />
      <Content />
    </Fragment>
  );
};

EmployeeDetailPayrollDetails.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onSubTabSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedTab: getSubTab(state),
});

export default connect(mapStateToProps)(EmployeeDetailPayrollDetails);
