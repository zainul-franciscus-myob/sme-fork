import {
  Checkbox,
  CheckboxGroup,
  Field,
  Icons,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getTabData } from '../SalesSettingsDetailSelectors';
import NzDirectDeposit from './NzDirectDeposit';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const NzPaymentOptions = ({ salesSettings, onUpdateSalesSettingsItem }) => (
  <>
    <Field
      label="Mail"
      hideLabel
      renderField={() => (
        <legend className="margin-bottom-00">Direct deposit</legend>
      )}
    />

    <CheckboxGroup
      label="Allow payments by direct deposit"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isAllowPaymentsByDirectDeposit"
          label="Allow payments by direct deposit"
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              Show direct deposit details at the bottom of your invoices
            </Tooltip>
          }
          checked={salesSettings.isAllowPaymentsByDirectDeposit}
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />

    {salesSettings.isAllowPaymentsByDirectDeposit && (
      <NzDirectDeposit onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
    )}

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
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              Show your business address on your invoices
            </Tooltip>
          }
          checked={salesSettings.isAllowPaymentsByMail}
          onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
        />
      )}
    />
  </>
);

const mapStateToProps = (state) => ({
  salesSettings: getTabData(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(NzPaymentOptions);
