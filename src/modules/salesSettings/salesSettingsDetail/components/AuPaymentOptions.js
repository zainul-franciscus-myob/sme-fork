import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getIsRegistered, getPayDirectLink, getTabData,
} from '../SalesSettingsDetailSelectors';
import AuDirectDeposit from './AuDirectDeposit';
import OnlinePaymentOptions from './OnlinePaymentOptions';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const AuPaymentOptions = ({
  salesSettings,
  onUpdateSalesSettingsItem,
}) => (
  <>
    <OnlinePaymentOptions onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
    <hr />
    <CheckboxGroup
      label="Allow payments by direct deposit"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isAllowPaymentsByDirectDeposit"
          label="Allow payments by direct deposit"
          checked={salesSettings.isAllowPaymentsByDirectDeposit}
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />
    {salesSettings.isAllowPaymentsByDirectDeposit && <AuDirectDeposit />}
  </>
);

const mapStateToProps = state => ({
  salesSettings: getTabData(state),
  isRegistered: getIsRegistered(state),
  payDirectLink: getPayDirectLink(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(AuPaymentOptions);
