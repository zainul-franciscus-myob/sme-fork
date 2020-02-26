import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetails,
  getContactDetails,
  getIsRegionAu,
  getRegionTaxDetails,
} from '../invoiceBusinessSettingsDetailSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const InvoiceBusinessSettingsDetails = ({
  abn,
  address,
  email,
  irdNumber,
  isAu,
  onChange,
  organisationName,
  phoneNumber,
  tradingName,
}) => (
  <FieldGroup label="Add business details">
    <p>
      Enter the details you want to show on your quotes and invoices.
      You can change these at any time from the business details page.
    </p>

    <Input
      name="organisationName"
      label="Business name"
      value={organisationName}
      requiredLabel="required"
      onChange={handleInputChange(onChange)}
      width="xl"
    />

    <Input
      name="tradingName"
      label="Trading name"
      value={tradingName}
      onChange={handleInputChange(onChange)}
      width="xl"
    />

    {isAu
      ? (
        <AbnInput
          name="abn"
          label="ABN"
          value={abn}
          maxLength={14}
          onChange={handleInputChange(onChange)}
          width="sm"
        />
      )
      : (
        <Input
          name="irdNumber"
          label="IRD Number/GST Number"
          value={irdNumber}
          onChange={handleInputChange(onChange)}
          width="sm"
        />
      )
    }

    <TextArea
      autoSize
      label="Address"
      maxLength={255}
      name="address"
      onChange={handleInputChange(onChange)}
      resize="vertical"
      value={address}
      width="xl"
    />

    <Input
      label="Phone"
      name="phoneNumber"
      onChange={handleInputChange(onChange)}
      value={phoneNumber}
      width="xl"
    />

    <Input
      label="Email"
      name="email"
      onChange={handleInputChange(onChange)}
      value={email}
      width="xl"
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  ...getBusinessDetails(state),
  ...getContactDetails(state),
  ...getRegionTaxDetails(state),
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(InvoiceBusinessSettingsDetails);
