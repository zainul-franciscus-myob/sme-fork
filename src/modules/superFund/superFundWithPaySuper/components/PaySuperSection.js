import { Checkbox, CheckboxGroup, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getIsPaySuperFund,
} from '../SuperFundWithPaySuperSelectors';

const onCheckboxChange = (handler) => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const PaySuperSection = ({
  isPaySuperFund,
  isCreating,
  listeners: { onUpdateSuperFundDetail },
}) => (
  <CheckboxGroup
    label="Pay using PaySuper"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        name="isPaySuperFund"
        label="Pay using PaySuper"
        labelAccessory={
          <Tooltip>
            Select to pay employee super contributions and remit details to this
            fund directly from MYOB
          </Tooltip>
        }
        checked={isPaySuperFund}
        onChange={onCheckboxChange(onUpdateSuperFundDetail)}
        disabled={!isCreating}
      />
    )}
  />
);

const mapStateToProps = (state) => ({
  isPaySuperFund: getIsPaySuperFund(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(PaySuperSection);
