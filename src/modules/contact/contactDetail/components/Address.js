import { FieldGroup, Input, Select, TextArea } from '@myob/myob-widgets';
import React from 'react';

import CountryCombobox from '../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../components/phoneNumberList/PhoneNumberList';
import style from './Address.module.css';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const onComboBoxChange = (handler, key) => (option) => {
  const { id: value } = option;
  handler({ key, value });
};

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
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
  const stateInput = isStateDropdown ? (
    <Select
      label="State/territory"
      name="state"
      value={state}
      onChange={onInputChange(onAddressChange)}
      width="xs"
    >
      {[<Select.Option value="placeholder" label="" hidden />].concat(
        stateOptions.map(({ name, id }) => (
          <Select.Option key={id} value={id} label={name} />
        ))
      )}
    </Select>
  ) : (
    <Input
      label="Region"
      name="state"
      value={state}
      onChange={onInputChange(onAddressChange)}
    />
  );

  return (
    <FieldGroup label={title}>
      <fieldset className={style.addressGroup}>
        <legend className="sr-only">Address</legend>
        <CountryCombobox
          hideLabel={false}
          label="Country"
          name="country"
          selectedId={country}
          onChange={onComboBoxChange(onAddressChange, 'country')}
          width="lg"
        />
        <TextArea
          name="street"
          label="Address"
          autoSize
          rows={3}
          resize="vertical"
          maxLength={255}
          value={street}
          onChange={onInputChange(onAddressChange)}
          width="lg"
        />
        <Input
          name="city"
          label="Suburb/town/locality"
          value={city}
          onChange={onInputChange(onAddressChange)}
          width="lg"
        />
        {stateInput}
        <Input
          name="postcode"
          label="Postcode"
          value={postcode}
          onChange={onInputChange(onAddressChange)}
          width="xs"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Contact information</legend>
        <Input
          name="businessContact"
          label="Contact person"
          value={businessContact}
          onChange={onInputChange(onAddressChange)}
          width="lg"
        />
        <Input
          name="email"
          label="Email"
          value={email}
          onChange={onInputChange(onAddressChange)}
          width="lg"
        />
        <Input
          name="fax"
          label="Fax"
          value={fax}
          onChange={onInputChange(onAddressChange)}
          width="md"
        />
        <PhoneNumberList
          inputClassName={style.phone}
          phoneNumbers={phoneNumbers}
          hasAddPhoneButton={hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onAddressChange)}
        />
      </fieldset>
    </FieldGroup>
  );
};

export default Address;
