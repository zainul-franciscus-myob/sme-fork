import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getTabData } from '../SalesSettingsDetailSelectors';
import NzAccountNumberInputs from './NzAccountNumberInputs';
import UpperCaseInputFormatter from '../../../../components/autoFormatter/UpperCaseInput/UpperCaseInputFormatter';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const NzPaymentOptions = ({ salesSettings, onUpdateSalesSettingsItem }) => {
  const directDepositPayment = (
    <>
      <UpperCaseInputFormatter
        name="bankName"
        label="Bank"
        requiredLabel="This field is required"
        maxLength={30}
        value={salesSettings.bankName}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
      />
      <UpperCaseInputFormatter
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
    <>{salesSettings.isAllowPaymentsByDirectDeposit && directDepositPayment}</>
  );
};

const mapStateToProps = (state) => ({
  salesSettings: getTabData(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(NzPaymentOptions);
