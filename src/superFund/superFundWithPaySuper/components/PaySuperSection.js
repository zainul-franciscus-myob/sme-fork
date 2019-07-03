import { Checkbox, CheckboxGroup, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsPaySuperFund } from '../SuperFundWithPaySuperSelectors';

const onCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const PaySuperSection = ({
  isPaySuperFund,
  listeners: { onUpdateSuperFundDetail },
}) => (
  <CheckboxGroup
    label="Pay using PaySuper"
    hideLabel
    renderCheckbox={() => (
      <Checkbox
        name="isPaySuperFund"
        label="Pay using PaySuper"
        labelAccessory={(
          <Tooltip>
            Select to pay employee super contributions
            and remit details to this fund directly from MYOB
          </Tooltip>
    )}
        checked={isPaySuperFund}
        onChange={onCheckboxChange(onUpdateSuperFundDetail)}
      />
    )}
  />
);

const mapStateToProps = state => ({
  isPaySuperFund: getIsPaySuperFund(state),
});

export default connect(mapStateToProps)(PaySuperSection);
