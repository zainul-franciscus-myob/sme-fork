import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  InfoIcon,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const PaymentsByMail = ({ paymentOptions, onUpdatePaymentOptions }) => (
  <>
    <FieldGroup label="Mail">
      <CheckboxGroup
        label="Allow payments by mail"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isAllowPaymentsByMail"
            label="Allow payments by mail"
            labelAccessory={
              <Tooltip triggerContent={<InfoIcon />}>
                Show your business address on your invoices
              </Tooltip>
            }
            checked={paymentOptions.isAllowPaymentsByMail}
            onChange={handleCheckboxChange(onUpdatePaymentOptions)}
          />
        )}
      />
      {paymentOptions.isAllowPaymentsByMail && (
        <TextArea
          label="Address"
          autoSize
          value={paymentOptions.address}
          name="address"
          onChange={handleInputChange(onUpdatePaymentOptions)}
          resize="vertical"
          maxLength={255}
        />
      )}
    </FieldGroup>
  </>
);

export default PaymentsByMail;
