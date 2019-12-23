import { Checkbox, CheckboxGroup, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getTabData } from '../SalesSettingsDetailSelectors';
import NzAccountNumberInputs from './NzAccountNumberInputs';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const NzPaymentOptions = ({
  salesSettings,
  onUpdateSalesSettingsItem,
}) => {
  const directDepositPayment = (
    <>
      <Input
        name="bankName"
        label="Bank"
        requiredLabel="This field is required"
        maxLength={60}
        value={salesSettings.bankName}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
      />
      <Input
        name="accountName"
        label="Account name"
        requiredLabel="This field is required"
        maxLength={60}
        value={salesSettings.accountName}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
      />
      <NzAccountNumberInputs onChange={onUpdateSalesSettingsItem} />
    </>
  );

  return (
    <>
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
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(NzPaymentOptions);
