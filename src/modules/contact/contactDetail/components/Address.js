import {
  FieldGroup,
  Icons,
  Input,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import CountryEditableCombobox from '../../../../components/combobox/CountryEditableCombobox';
import PhoneNumberList from '../../../../components/phoneNumberList/PhoneNumberList';
import StateEditableCombobox from '../../../../components/combobox/StateEditableCombobox';
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
  website,
  hasAddPhoneButton,
  isStateDropdown,
  stateOptions,
  onAddressChange,
}) => {
  const stateInput = isStateDropdown ? (
    <StateEditableCombobox
      hideLabel={false}
      name="state"
      selectedId={state}
      onChange={onComboBoxChange(onAddressChange, 'state')}
      width="lg"
      label="State/territory"
      items={stateOptions}
    />
  ) : (
    <Input
      label="Region"
      name="state"
      value={state}
      onChange={onInputChange(onAddressChange)}
      width="lg"
    />
  );

  return (
    <FieldGroup label={title}>
      <fieldset className={style.addressGroup}>
        <legend className="sr-only">Address</legend>
        <CountryEditableCombobox
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
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              Use a semicolon to add another email.
            </Tooltip>
          }
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
        <Input
          name="website"
          label="Website"
          value={website}
          onChange={onInputChange(onAddressChange)}
          width="lg"
        />
      </fieldset>
    </FieldGroup>
  );
};

export default Address;
