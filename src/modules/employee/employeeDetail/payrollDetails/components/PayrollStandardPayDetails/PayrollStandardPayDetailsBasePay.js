import {
  FieldGroup, FormHorizontal, Input, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBasePay } from '../../selectors/PayrollStandardPaySelectors';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import styles from './PayrollStandardPayDetailsBasePay.module.css';

const PayrollStandardPayDetailsBasePay = ({
  payCycle,
  payPeriodHours,
  description,
  onChange,
}) => (
  <div className={styles.formWidth}>
    <FormHorizontal>
      <FieldGroup label="Base pay details">
        <ReadOnly name="payCycle" label="Pay cycle">{payCycle}</ReadOnly>
        <ReadOnly name="hourPerPayCycle" label="Hours per pay cycle">{payPeriodHours}</ReadOnly>
        <Input name="description" label="Pay slip message" value={description} onChange={handleInputChange(onChange)} />
      </FieldGroup>
    </FormHorizontal>
  </div>
);

const mapStateToProps = state => getBasePay(state);

export default connect(mapStateToProps)(PayrollStandardPayDetailsBasePay);
