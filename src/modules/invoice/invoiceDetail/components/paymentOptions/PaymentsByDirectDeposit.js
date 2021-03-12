import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  InfoIcon,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRegion } from '../../selectors/invoiceDetailSelectors';
import AuPaymentOptions from './AuPaymentOptions';
import NzPaymentOptions from './NzPaymentOptions';
import Region from '../../../../../common/types/Region';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';

const PaymentsByDirectDeposit = ({
  region,
  paymentOptions,
  onUpdatePaymentOptions,
}) => {
  const PaymentOptions = {
    [Region.au]: AuPaymentOptions,
    [Region.nz]: NzPaymentOptions,
  }[region];

  return (
    <>
      <FieldGroup label="Direct Deposit">
        <CheckboxGroup
          label="Allow payments by direct deposit"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isAllowPaymentsByDirectDeposit"
              label="Allow payments by direct deposit"
              labelAccessory={
                <Tooltip triggerContent={<InfoIcon />}>
                  Show direct deposit details at the bottom of your invoices
                </Tooltip>
              }
              checked={paymentOptions.isAllowPaymentsByDirectDeposit}
              onChange={handleCheckboxChange(onUpdatePaymentOptions)}
            />
          )}
        />
        {paymentOptions.isAllowPaymentsByDirectDeposit && (
          <PaymentOptions
            paymentOptions={paymentOptions}
            onUpdatePaymentOptions={onUpdatePaymentOptions}
          />
        )}
      </FieldGroup>
    </>
  );
};

const mapStateToProps = (state) => ({
  region: getRegion(state),
});

export default connect(mapStateToProps)(PaymentsByDirectDeposit);
