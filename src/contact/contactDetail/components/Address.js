import {
  FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import PhoneNumberList from './PhoneNumberList';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onPhoneNumberChange = handler => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const Address = ({
  title,
  street,
  city,
  state,
  postcode,
  country,
  phoneNumbers,
  fax,
  email,
  hasAddPhoneButton,
  onAddressChange,
}) => (
  <FieldGroup label={title}>
    <TextArea
      name="street"
      label="Street address"
      autoSize
      resize="vertical"
      maxLength={255}
      value={street}
      onChange={onInputChange(onAddressChange)}
    />
    <Input name="city" label="City" placeholder="e.g. Sydney" value={city} onChange={onInputChange(onAddressChange)} />
    <Input name="state" label="State" placeholder="e.g. NSW" value={state} onChange={onInputChange(onAddressChange)} />
    <Input name="postcode" label="Postcode" placeholder="e.g. 3000" value={postcode} onChange={onInputChange(onAddressChange)} />
    <Input name="country" label="Country" placeholder="e.g. Australia" value={country} onChange={onInputChange(onAddressChange)} />
    <PhoneNumberList
      phoneNumbers={phoneNumbers}
      hasAddPhoneButton={hasAddPhoneButton}
      onPhoneNumbersChange={onPhoneNumberChange(onAddressChange)}
    />
    <Input name="fax" label="Fax" value={fax} onChange={onInputChange(onAddressChange)} />
    <Input name="email" label="Email" value={email} onChange={onInputChange(onAddressChange)} />
  </FieldGroup>
);

Address.propTypes = {
  title: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  fax: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  hasAddPhoneButton: PropTypes.bool.isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

export default Address;
