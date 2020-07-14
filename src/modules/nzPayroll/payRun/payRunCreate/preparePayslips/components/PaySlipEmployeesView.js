import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPrintPaySlipEmployees } from '../PreparePaySlipsSelectors';
import PrintPaySlipsView from './PrintPaySlipsView';

const PaySlipEmployeesView = ({ printPaySlipEmployees }) => (
  <FieldGroup label="Employees">
    <PrintPaySlipsView employees={printPaySlipEmployees} />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  printPaySlipEmployees: getPrintPaySlipEmployees(state),
});

export default connect(mapStateToProps)(PaySlipEmployeesView);
