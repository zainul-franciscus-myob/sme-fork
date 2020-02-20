import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemInfo } from '../superPayItemSelectors';
import DollarInput from '../../components/DollarInput';
import SuperPayItemCalculationBasis from './SuperPayItemCalculationBasis';
import SuperPayItemLimit from './SuperPayItemLimit';

const handleCheckBoxChange = handler => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const SuperPayItemInfo = (props) => {
  const {
    printOnPayAdvice,
    threshold,
    onSuperPayItemDetailsChange,
  } = props;

  return (
    <FieldGroup label="Super information">
      <CheckboxGroup
        label="Print on pay slip"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            id="printOnPayAdvice"
            name="printOnPayAdvice"
            label="Print on pay slip"
            checked={printOnPayAdvice}
            onChange={handleCheckBoxChange(onSuperPayItemDetailsChange)}
          />
        )}
      />
      <SuperPayItemCalculationBasis onSuperPayItemDetailsChange={onSuperPayItemDetailsChange} />
      <SuperPayItemLimit onSuperPayItemDetailsChange={onSuperPayItemDetailsChange} />
      <DollarInput
        label="Threshold $"
        name="threshold"
        value={threshold}
        onChange={onSuperPayItemDetailsChange}
        labelAccessory={(
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            Calculate once eligible wages of this amount have been paid per month
          </Tooltip>
        )}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => getSuperPayItemInfo(state);

export default connect(mapStateToProps)(SuperPayItemInfo);
