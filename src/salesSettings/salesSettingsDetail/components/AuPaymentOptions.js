import {
  Checkbox, CheckboxGroup, Field, Icons, Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getIsRegistered, getPayDirectLink, getTabData,
} from '../SalesSettingsDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AccountNumberInput from '../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../components/autoFormatter/BankDetailsInput/BSBInput';
import LinkButton from '../../../components/Button/LinkButton';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import onlinePaymentMethodsImage from './OnlinePaymentMethods.png';
import styles from './AuPaymentOptions.module.css';

const AuPaymentOptions = ({
  accountOptions,
  salesSettings,
  payDirectLink,
  isRegistered,
  onUpdateSalesSettingsItem,
}) => {
  const registeredView = (
    <>
      <p className={styles.registeredView}>
        You have online invoice payments
        <span className={styles.status}> activated</span>
        <span>. </span>
        <LinkButton
          href={payDirectLink}
          icon={<Icons.OpenExternalLink />}
          iconRight
          isOpenInNewTab
        >
          Edit preferences
        </LinkButton>
      </p>

    </>
  );

  const unregisteredView = (
    <div className={styles.unRegisteredView}>
      <p>
        Setting up online payment allows your customers to
        pay direct from their emailed invoice -
        meaning you get paid faster and minimise the risk of overdue payments.
        <br />
        <a href="https://help.myob.com/wiki/display/ea/Online+payments" target="_blank" rel="noopener noreferrer">Learn more</a>
      </p>
      <LinkButton
        href={payDirectLink}
        icon={<Icons.OpenExternalLink />}
        iconRight
        isOpenInNewTab
      >
        Set up online payments options
      </LinkButton>
    </div>
  );

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
      <Field
        label="Online payments"
        renderField={() => (
          <>
            <img src={onlinePaymentMethodsImage} alt="Online payments methods" className={styles.onlinePaymentMethodsImage} />
            { isRegistered ? registeredView : unregisteredView }
          </>
        )}
      />
      { isRegistered && (
      <Field
        label="Account for receiving online payments"
        renderField={() => (
          <div className={styles.account}>
            <AccountCombobox
              label="Account for receiving online payments"
              hideLabel
              items={accountOptions}
              selectedId={salesSettings.accountId}
              onChange={handleComboboxChange('accountId', onUpdateSalesSettingsItem)}
            />
            <p>
              This account must match the bank account you chose when
              setting up your online payments.
            </p>
          </div>
        )}
      />
      )}
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
