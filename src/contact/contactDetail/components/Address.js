import {
  FieldGroup, Input, Select, TextArea,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import CountryCombobox from '../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../components/phoneNumberList/PhoneNumberList';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onComboBoxChange = (handler, key) => (option) => {
  const { value } = option;
  handler({ key, value });
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
  businessContact,
  phoneNumbers,
  fax,
  email,
  hasAddPhoneButton,
  isStateDropdown,
  stateOptions,
  onAddressChange,
}) => {
  const stateInput = isStateDropdown
    ? (
      <Select label="State/territory" name="state" value={state} onChange={onInputChange(onAddressChange)}>
        {stateOptions.map(
          ({ name, value }) => <Select.Option key={value} value={value} label={name} />,
        )}
      </Select>
    )
    : <Input label="Region" name="state" value={state} onChange={onInputChange(onAddressChange)} />;

  return (
    <FieldGroup label={title}>
      <CountryCombobox
        hideLabel={false}
        label="Country"
        name="country"
        selectedId={country}
        onChange={onComboBoxChange(onAddressChange, 'country')}
      />
      <TextArea
        name="street"
        label="Address"
        autoSize
        resize="vertical"
        maxLength={255}
        value={street}
        onChange={onInputChange(onAddressChange)}
      />
      <Input name="city" label="Suburb/town/locality" value={city} onChange={onInputChange(onAddressChange)} />
      { stateInput }
      <Input name="postcode" label="Postcode" value={postcode} onChange={onInputChange(onAddressChange)} />
      <Input name="businessContact" label="Contact person" value={businessContact} onChange={onInputChange(onAddressChange)} />
      <Input name="email" label="Email" value={email} onChange={onInputChange(onAddressChange)} />
      <Input name="fax" label="Fax" value={fax} onChange={onInputChange(onAddressChange)} />
      <PhoneNumberList
        phoneNumbers={phoneNumbers}
        hasAddPhoneButton={hasAddPhoneButton}
        onPhoneNumbersChange={onPhoneNumberChange(onAddressChange)}
      />
    </FieldGroup>
  );
};

Address.propTypes = {
  title: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  businessContact: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  fax: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  hasAddPhoneButton: PropTypes.bool.isRequired,
  isStateDropdown: PropTypes.bool.isRequired,
  stateOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

export default Address;
