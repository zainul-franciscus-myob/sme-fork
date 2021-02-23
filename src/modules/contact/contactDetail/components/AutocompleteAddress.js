import { FieldGroup, Icons, Input, Select, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import CountryCombobox from '../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../components/phoneNumberList/PhoneNumberList';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import style from './Address.module.css';

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const AutocompleteAddress = ({
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
  website,
  hasAddPhoneButton,
  isStateDropdown,
  stateOptions,
  onAddressChange,
  autoCompleteCombobox,
  shouldShowAutocompleteAddressCombobox,
}) => {
  const stateInput = isStateDropdown ? (
    <Select
      label="State/territory"
      name="state"
      value={state}
      onChange={handleInputChange(onAddressChange)}
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
      onChange={handleInputChange(onAddressChange)}
    />
  );

  const address = shouldShowAutocompleteAddressCombobox ? (
    autoCompleteCombobox
  ) : (
    <Input
      name="street"
      label="Address"
      autoSize
      rows={3}
      resize="vertical"
      maxLength={255}
      value={street}
      onChange={handleInputChange(onAddressChange)}
      width="lg"
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
          onChange={handleComboboxChange('country', onAddressChange)}
          width="lg"
        />
        {address}
        <Input
          name="city"
          label="Suburb/town/locality"
          value={city}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
        />
        {stateInput}
        <Input
          name="postcode"
          label="Postcode"
          value={postcode}
          onChange={handleInputChange(onAddressChange)}
          width="xs"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Contact information</legend>
        <Input
          name="businessContact"
          label="Contact person"
          value={businessContact}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
        />
        <Input
          name="email"
          label="Email"
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              Use a semicolon to add another email.
            </Tooltip>
          }
          value={email}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
        />
        <Input
          name="fax"
          label="Fax"
          value={fax}
          onChange={handleInputChange(onAddressChange)}
          width="md"
        />
        <PhoneNumberList
          inputClassName={style.phone}
          phoneNumbers={phoneNumbers}
          hasAddPhoneButton={hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onAddressChange)}
        />
        <Input
          name="website"
          label="Website"
          value={website}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
        />
      </fieldset>
    </FieldGroup>
  );
};

export default AutocompleteAddress;
