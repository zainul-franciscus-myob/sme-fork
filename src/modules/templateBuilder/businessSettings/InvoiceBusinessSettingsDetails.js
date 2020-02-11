import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetails,
  getContactDetails,
  getIsRegionAu,
} from '../../business/businessDetail/businessDetailSelectors';
import AuTaxDetails from '../../business/businessDetail/components/AuTaxDetails';
import NzTaxDetails from '../../business/businessDetail/components/NzTaxDetails';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const InvoiceBusinessSettingsDetails = ({
  address,
  email,
  isAu,
  onChange,
  organisationName,
  phoneNumber,
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

    {isAu ? <AuTaxDetails onChange={onChange} /> : <NzTaxDetails onChange={onChange} />}

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
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(InvoiceBusinessSettingsDetails);
