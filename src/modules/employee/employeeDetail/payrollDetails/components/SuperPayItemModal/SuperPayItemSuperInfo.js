import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Icons,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemInfo } from '../../selectors/SuperPayItemModalSelectors';
import DollarInput from '../DollarInput';
import SuperPayItemCalculationBasis from './SuperPayItemCalculationBasis';
import SuperPayItemLimit from './SuperPayItemLimit';
import handleCheckboxChange from '../../../../../../components/handlers/handleCheckboxChange';

const SuperPayItemInfo = (props) => {
  const { printOnPayAdvice, threshold, onChange } = props;

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
            onChange={handleCheckboxChange(onChange)}
          />
        )}
      />
      <SuperPayItemCalculationBasis onSuperPayItemDetailsChange={onChange} />
      <SuperPayItemLimit onSuperPayItemDetailsChange={onChange} />
      <DollarInput
        label="Threshold $"
        name="threshold"
        value={threshold}
        onChange={onChange}
        labelAccessory={
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            Calculate once eligible wages of this amount have been paid per
            month
          </Tooltip>
        }
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getSuperPayItemInfo(state);

export default connect(mapStateToProps)(SuperPayItemInfo);
