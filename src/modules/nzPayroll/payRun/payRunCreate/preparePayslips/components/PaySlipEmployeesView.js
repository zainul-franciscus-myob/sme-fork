import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import PrintPaySlipsView from './PrintPaySlipsView';
import getEmployeePayListForPaySlips from '../PreparePaySlipsSelectors';

const PaySlipEmployeesView = ({ printPaySlipEmployees }) => (
  <FieldGroup label="Employees">
    <PrintPaySlipsView employees={printPaySlipEmployees} />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  printPaySlipEmployees: getEmployeePayListForPaySlips(state),
});

export default connect(mapStateToProps)(PaySlipEmployeesView);
