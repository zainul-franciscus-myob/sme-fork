import {
  Input, RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAbnLoading,
  getIsPaySuperFund,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import fundTypes from '../FundTypes';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const SuperFundBasic = ({
  superFund,
  superFundModalListeners: { onUpdateSuperFundDetail },
  isAbnLoading,
  isPaySuperFund,
}) => (
  <>
    <Input
      name="name"
      label="Name"
      value={superFund.name}
      maxLength={76}
      onChange={handleInputChange(onUpdateSuperFundDetail)}
      disabled={isAbnLoading}
    />
    { isPaySuperFund && (
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
            onChange={handleInputChange(onUpdateSuperFundDetail)}
          />
        ))}
      />
    )}
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  isAbnLoading: getIsAbnLoading(state),
  isPaySuperFund: getIsPaySuperFund(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
