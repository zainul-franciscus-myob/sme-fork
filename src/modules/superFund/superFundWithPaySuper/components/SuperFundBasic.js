import {
  FormHorizontal, Input, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAbnLoading,
  getIsCreating,
  getShowFundType,
  getSuperFund,
} from '../SuperFundWithPaySuperSelectors';
import fundTypes from '../FundTypes';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundBasic = ({
  superFund,
  listeners: { onUpdateSuperFundDetail },
  isAbnLoading,
  isCreating,
  showFundType,
}) => (
  <React.Fragment>
    <Input
      name="name"
      label="Name"
      value={superFund.name}
      maxLength={76}
      onChange={onInputChange(onUpdateSuperFundDetail)}
      disabled={isAbnLoading}
    />
    { showFundType && (
      <FormHorizontal>
        <RadioButtonGroup
          label="Type"
          name="fundType"
          renderRadios={() => fundTypes.map(({ name, value }) => (
            <RadioButton
              key={name}
              name="fundType"
              label={name}
              value={value}
              checked={value === superFund.fundType}
              onChange={onInputChange(onUpdateSuperFundDetail)}
              disabled={!isCreating}
            />
          ))}
        />
      </FormHorizontal>
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  isAbnLoading: getIsAbnLoading(state),
  isCreating: getIsCreating(state),
  showFundType: getShowFundType(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
