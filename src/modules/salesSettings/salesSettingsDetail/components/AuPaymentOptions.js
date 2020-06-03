import {
  Checkbox, CheckboxGroup, Field, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getIsRegistered, getTabData } from '../SalesSettingsDetailSelectors';
import AuDirectDeposit from './AuDirectDeposit';
import OnlinePaymentOptions from './OnlinePaymentOptions';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const AuPaymentOptions = ({ onUpdateSalesSettingsItem, salesSettings, onSubscribeNowClick }) => (
  <>
    <Field
      hideLabel
      label="Mail"
      renderField={() => <legend className="margin-bottom-00">Direct deposit</legend>}
    />

    <CheckboxGroup
      hideLabel
      label="Allow payments by direct deposit"
      renderCheckbox={() => (
        <Checkbox
          checked={salesSettings.isAllowPaymentsByDirectDeposit}
          label="Allow payments by direct deposit"
          labelAccessory={(
            <Tooltip triggerContent={<Icons.Info />}>
              Show direct deposit details at the bottom of your invoices
            </Tooltip>
          )}
          name="isAllowPaymentsByDirectDeposit"
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />

    {
      salesSettings.isAllowPaymentsByDirectDeposit
      && <AuDirectDeposit onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
    }

    <hr />

    <Field
      hideLabel
      label="Mail"
      renderField={() => <legend className="margin-bottom-00">Mail</legend>}
    />

    <CheckboxGroup
      hideLabel
      label="Allow payments by mail"
      renderCheckbox={() => (
        <Checkbox
          checked={salesSettings.isAllowPaymentsByMail}
          label="Allow payments by mail"
          labelAccessory={(
            <Tooltip triggerContent={<Icons.Info />}>
              Show your business address on your invoices
            </Tooltip>
          )}
          name="isAllowPaymentsByMail"
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />

    <hr />

    <OnlinePaymentOptions
      onSubscribeNowClick={onSubscribeNowClick}
      onUpdateSalesSettingsItem={onUpdateSalesSettingsItem}
    />
  </>
);

const mapStateToProps = state => ({
  accountOptions: getAccountOptions(state),
  isRegistered: getIsRegistered(state),
  salesSettings: getTabData(state),
});

export default connect(mapStateToProps)(AuPaymentOptions);
