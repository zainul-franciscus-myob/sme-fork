import {
  Alert, Field, RadioButton, RadioButtonGroup, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSelfManagedSuperFundEnabled,
  getShowSelfManagedSuperFundWarning,
  getSuperFund,
} from '../../../selectors/SuperFundModalSelectors';
import { selfManagedSuperFund, standardSuperFund } from '../FundTypes';
import handleInputChange from '../../../../../../../components/handlers/handleInputChange';

const SuperFundBasic = ({
  superFund,
  superFundModalListeners: { onUpdateSuperFundDetail },
  selfManagedSuperFundEnabled,
  showSelfManagedSuperFundWarning,
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
          disabled={!selfManagedSuperFundEnabled}
          labelAccessory={(
            <Tooltip>
                You can only select an SMSF if you sign up to Pay super
            </Tooltip>
            )}
        />,
      ]}
    />
    {showSelfManagedSuperFundWarning && (
    <Field
      renderField={() => (
        <Alert type="warning">
              It looks like you&apos;re not authorised
               to do this. Only a person from the business with the role of administrator
               can create or edit a self managed
              super fund in Pay super.
        </Alert>
      )}
    />
    )}
  </>
);

const mapStateToProps = state => ({
  superFund: getSuperFund(state),
  selfManagedSuperFundEnabled: getSelfManagedSuperFundEnabled(state),
  showSelfManagedSuperFundWarning: getShowSelfManagedSuperFundWarning(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
