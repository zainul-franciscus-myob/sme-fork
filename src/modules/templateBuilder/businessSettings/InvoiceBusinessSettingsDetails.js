import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetails,
  getContactDetails,
} from '../../business/businessDetail/businessDetailSelectors';
import { getRegion } from '../../template/templateSelectors';
import AbnInput from '../../../components/autoFormatter/AbnInput/AbnInput';
import NzTaxDetails from '../../business/businessDetail/components/NzTaxDetails';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const InvoiceBusinessSettingsDetails = ({
  address,
  email,
  onChange,
  organisationName,
  tradingName,
  phoneNumber,
  abn,
  region,
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
      onChange={onInputChange(onChange)}
      width="xl"
    />

    <Input
      name="tradingName"
      label="Trading name"
      value={tradingName}
      onChange={onInputChange(onChange)}
      width="xl"
    />

    {region === 'au'
      ? (
        <AbnInput
          name="abn"
          label="ABN"
          value={abn}
          maxLength={14}
          onChange={onInputChange(onChange)}
          width="sm"
        />
      )
      : <NzTaxDetails onChange={onChange} />}

    <TextArea
      autoSize
      label="Address"
      maxLength={255}
      name="address"
      onChange={onInputChange(onChange)}
      resize="vertical"
      value={address}
      width="xl"
    />

    <Input
      label="Phone"
      name="phoneNumber"
      onChange={onInputChange(onChange)}
      value={phoneNumber}
      width="xl"
    />

    <Input
      label="Email"
      name="email"
      onChange={onInputChange(onChange)}
      value={email}
      width="xl"
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  ...getBusinessDetails(state),
  ...getContactDetails(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(InvoiceBusinessSettingsDetails);
