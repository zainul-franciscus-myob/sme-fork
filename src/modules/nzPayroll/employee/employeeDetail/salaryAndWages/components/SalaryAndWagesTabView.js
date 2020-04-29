import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHourlyRate, getPayCycleOptions, getSelectedPayBasis, getSelectedPayCycle,
} from '../salaryAndWageSelectors';
import PayDetailsFieldGroup from './PayDetailsFieldGroup';

const SalaryAndWagesTabView = ({
  hourlyRate,
  selectedPayBasis,
  selectedPayCycle,
  payCycleOptions,
  onWageDetailsChange,
}) => (
  <FormHorizontal layout="primary">
    <PayDetailsFieldGroup
      hourlyRate={hourlyRate}
      selectedPayBasis={selectedPayBasis}
      selectedPayCycle={selectedPayCycle}
      payCycleOptions={payCycleOptions}
      onWageDetailsChange={onWageDetailsChange}
    />
  </FormHorizontal>
);

const mapStateToProps = state => ({
  hourlyRate: getHourlyRate(state),
  selectedPayBasis: getSelectedPayBasis(state),
  selectedPayCycle: getSelectedPayCycle(state),
  payCycleOptions: getPayCycleOptions(state),
});

export default connect(mapStateToProps)(SalaryAndWagesTabView);
