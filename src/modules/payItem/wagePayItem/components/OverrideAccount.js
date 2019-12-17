import {
  Checkbox, CheckboxGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccounts,
  getDefaultAccountId,
  getOverrideAccount,
  getWage,
} from '../wagePayItemSelector';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';

const OverrideAccount = ({
  wage,
  accounts,
  defaultAccountId,
  overrideAccount,
  onDetailsChange,
  onOverrideAccountChange,
}) => (
  <React.Fragment>
    <CheckboxGroup
      label="overrideAccount"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="overrideAccount"
          label="Override employees' wage expense account"
          checked={overrideAccount}
          disabled={wage.isSystem}
          onChange={handleCheckboxChange(onOverrideAccountChange)}
        />
      )}
    />
    { overrideAccount && (
      <AccountCombobox
        label="accounts"
        items={accounts}
        selectedId={wage.accountId || defaultAccountId}
        onChange={handleComboboxChange('accountId', onDetailsChange)}
        disabled={wage.isSystem}
      />
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  wage: getWage(state),
  accounts: getAccounts(state),
  defaultAccountId: getDefaultAccountId(state),
  overrideAccount: getOverrideAccount(state),
});

export default connect(mapStateToProps)(OverrideAccount);
