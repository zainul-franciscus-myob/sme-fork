import {
  RadioButton, RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsPaySuperFund,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import { selfManagedSuperFund, standardSuperFund } from '../FundTypes';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';

const SuperFundBasic = ({
  superFund,
  superFundModalListeners: { onUpdateSuperFundDetail },
  isPaySuperFund,
}) => (
  <>
    <RadioButtonGroup
      label="Type"
      name="fundType"
      renderRadios={() => [
        <RadioButton
          key={standardSuperFund.name}
          name="fundType"
          label={standardSuperFund.name}
          value={standardSuperFund.value}
          checked={standardSuperFund.value === superFund.fundType}
          onChange={handleInputChange(onUpdateSuperFundDetail)}
        />,
        <RadioButton
          key={selfManagedSuperFund.name}
          name="fundType"
          label={selfManagedSuperFund.name}
          value={selfManagedSuperFund.value}
          checked={selfManagedSuperFund.value === superFund.fundType}
          onChange={handleInputChange(onUpdateSuperFundDetail)}
          disabled={!isPaySuperFund}
          labelAccessory={(
            <Tooltip>
                You can only select an SMSF if you sign up to Pay super
            </Tooltip>
            )}
        />,
      ]}
    />
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  isPaySuperFund: getIsPaySuperFund(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
