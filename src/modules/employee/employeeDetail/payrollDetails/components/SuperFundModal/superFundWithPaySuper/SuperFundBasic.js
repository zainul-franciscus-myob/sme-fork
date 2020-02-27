import {
  RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsPaySuperFund,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import fundTypes from '../FundTypes';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';

const SuperFundBasic = ({
  superFund,
  superFundModalListeners: { onUpdateSuperFundDetail },
  isPaySuperFund,
}) => (
  <>

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
  isPaySuperFund: getIsPaySuperFund(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
