import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getTabData } from '../SalesSettingsDetailSelectors';
import NzDirectDeposit from './NzDirectDeposit';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const NzPaymentOptions = ({
  salesSettings,
  onUpdateSalesSettingsItem,
}) => (
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
    {salesSettings.isAllowPaymentsByDirectDeposit && <NzDirectDeposit />}
  </>
);

const mapStateToProps = state => ({
  salesSettings: getTabData(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(NzPaymentOptions);
