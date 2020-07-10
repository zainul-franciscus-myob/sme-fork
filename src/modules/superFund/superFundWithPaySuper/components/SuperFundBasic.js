import {
  Alert,
  Field,
  FormHorizontal,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getSelfManagedSuperFundEnabled,
  getShowSelfManagedSuperFundWarning,
  getSuperFund,
} from '../SuperFundWithPaySuperSelectors';
import { selfManagedSuperFund, standardSuperFund } from '../../FundTypes';
import styles from './SuperFundAPRADetail.module.css';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundBasic = ({
  superFund,
  listeners: { onUpdateSuperFundDetail },
  isCreating,
  selfManagedSuperFundEnabled,
  showSelfManagedSuperFundWarning,
}) => (
  <React.Fragment>
    <FormHorizontal className={styles.fundType}>
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
            onChange={onInputChange(onUpdateSuperFundDetail)}
            disabled={!isCreating}
          />,
          <RadioButton
            key={selfManagedSuperFund.name}
            name="fundType"
            label={selfManagedSuperFund.name}
            value={selfManagedSuperFund.value}
            checked={selfManagedSuperFund.value === superFund.fundType}
            onChange={onInputChange(onUpdateSuperFundDetail)}
            disabled={!selfManagedSuperFundEnabled}
            labelAccessory={
              <Tooltip>
                You can only select an SMSF if you sign up to Pay super
              </Tooltip>
            }
          />,
        ]}
      />
      {showSelfManagedSuperFundWarning && (
        <Field
          renderField={() => (
            <Alert type="warning">
              It looks like you&apos;re not authorised to do this. Only a person
              from the business with the role of administrator can create or
              edit a self managed super fund in Pay super.
            </Alert>
          )}
        />
      )}
    </FormHorizontal>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  superFund: getSuperFund(state),
  isCreating: getIsCreating(state),
  selfManagedSuperFundEnabled: getSelfManagedSuperFundEnabled(state),
  showSelfManagedSuperFundWarning: getShowSelfManagedSuperFundWarning(state),
});

export default connect(mapStateToProps)(SuperFundBasic);
