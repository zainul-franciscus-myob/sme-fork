import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../businessSettingsSelectors';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const ContactDetailsSection = ({
  phoneNumber,
  fax,
  website,
  email,
  address,
  onChange,
}) => (
  <FieldGroup label="Contact details">
    <TextArea
      name="address"
      label="Address"
      autoSize
      resize="vertical"
      maxLength={255}
      value={address}
      onChange={onInputChange(onChange)}
      width="lg"
    />
    <Input
      name="website"
      label="Website"
      value={website}
      onChange={onInputChange(onChange)}
      maxLength={100}
      width="lg"
    />
    <Input
      name="email"
      label="Email"
      value={email}
      onChange={onInputChange(onChange)}
      width="lg"
    />
    <Input
      name="phoneNumber"
      label="Phone"
      value={phoneNumber}
      onChange={onInputChange(onChange)}
      width="md"
    />
    <Input
      name="fax"
      label="Fax"
      value={fax}
      onChange={onInputChange(onChange)}
      width="md"
    />
  </FieldGroup>
);

const mapStateToProps = (state) => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetailsSection);
