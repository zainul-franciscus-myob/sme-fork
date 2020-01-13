import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getIsRegistered, getPayDirectLink, getTabData,
} from '../SalesSettingsDetailSelectors';
import AccountNumberInput from '../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import OnlinePaymentOptions from './OnlinePaymentOptions';
import UpperCaseInputFormatter from '../../../../components/autoFormatter/UpperCaseInput/UpperCaseInputFormatter';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const AuPaymentOptions = ({
  salesSettings,
  onUpdateSalesSettingsItem,
}) => {
  const directDepositPayment = (
    <>
      <UpperCaseInputFormatter
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
        name="bankName"
        label="Bank"
        requiredLabel="This field is required"
        maxLength={30}
        value={salesSettings.bankName}
      />
      <UpperCaseInputFormatter
        name="accountName"
        label="Account name"
        requiredLabel="This field is required"
        maxLength={30}
        value={salesSettings.accountName}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
      />
      <BSBInput
        name="bsbNumber"
        label="BSB number"
        requiredLabel="This field is required"
        numeralIntegerScale={6}
        value={salesSettings.bsbNumber}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
        width="xs"
      />
      <AccountNumberInput
        name="accountNumber"
        label="Account number"
        requiredLabel="This field is required"
        numeralIntegerScale={9}
        value={salesSettings.accountNumber}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
        width="xs"
      />
    </>
  );

  return (
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
      {salesSettings.isAllowPaymentsByDirectDeposit && directDepositPayment}
    </>
  );
};

const mapStateToProps = state => ({
  salesSettings: getTabData(state),
  isRegistered: getIsRegistered(state),
  payDirectLink: getPayDirectLink(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(AuPaymentOptions);
