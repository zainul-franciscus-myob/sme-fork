import {
  Checkbox, CheckboxGroup, FieldGroup, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemInfo } from '../../selectors/SuperPayItemModalSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import SuperPayItemCalculationBasis from './SuperPayItemCalculationBasis';
import SuperPayItemLimit from './SuperPayItemLimit';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const SuperPayItemInfo = (props) => {
  const {
    printOnPayAdvice,
    threshold,
    onChange,
    onBlur,
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
            onChange={handleCheckboxChange(onChange)}
          />
        )}
      />
      <SuperPayItemCalculationBasis
        onSuperPayItemDetailsChange={onChange}
        onSuperPayItemDetailBlur={onBlur}
      />
      <SuperPayItemLimit
        onSuperPayItemDetailsChange={onChange}
        onSuperPayItemDetailBlur={onBlur}
      />
      <AmountInput
        label="Threshold $"
        name="threshold"
        value={threshold}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputChange(onBlur)}
        numeralIntegerScale={13}
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
