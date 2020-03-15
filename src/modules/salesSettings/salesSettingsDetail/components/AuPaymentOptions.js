import {
  Checkbox, CheckboxGroup, Field, Icons, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getIsRegistered, getPayDirectLink, getTabData,
} from '../SalesSettingsDetailSelectors';
import AuDirectDeposit from './AuDirectDeposit';
import OnlinePaymentOptions from './OnlinePaymentOptions';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const AuPaymentOptions = ({ onUpdateSalesSettingsItem, salesSettings }) => (
  <>
    <Field
      label="Mail"
      hideLabel
      renderField={() => <legend className="margin-bottom-00">Direct deposit</legend>}
    />

    <CheckboxGroup
      label="Allow payments by direct deposit"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isAllowPaymentsByDirectDeposit"
          label="Allow payments by direct deposit"
          labelAccessory={(
            <Tooltip triggerContent={<Icons.Info />}>
              Show direct deposit details at the bottom of your invoices
            </Tooltip>
          )}
          checked={salesSettings.isAllowPaymentsByDirectDeposit}
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
      label="Mail"
      hideLabel
      renderField={() => <legend className="margin-bottom-00">Mail</legend>}
    />

    <CheckboxGroup
      label="Allow payments by mail"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isAllowPaymentsByMail"
          label="Allow payments by mail"
          labelAccessory={(
            <Tooltip triggerContent={<Icons.Info />}>
              Show your business address on your invoices
            </Tooltip>
          )}
          checked={salesSettings.isAllowPaymentsByMail}
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />

    <hr />

    <OnlinePaymentOptions onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
  </>
);

const mapStateToProps = state => ({
  accountOptions: getAccountOptions(state),
  isRegistered: getIsRegistered(state),
  payDirectLink: getPayDirectLink(state),
  salesSettings: getTabData(state),
});

export default connect(mapStateToProps)(AuPaymentOptions);
