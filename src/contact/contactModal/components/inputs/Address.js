import {
  FieldGroup, Icons, Input, Select, TextArea,
} from '@myob/myob-widgets';
import React from 'react';

import Button from '../../../../components/Button/Button';
import CountryCombobox from '../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../components/phoneNumberList/PhoneNumberList';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import style from './Address.module.css';

const onComboBoxChange = (handler, key) => (option) => {
  const { value } = option;
  handler({ key, value });
};

const onPhoneNumberChange = handler => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const Address = ({
  title,
  toggleLabel,
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
  showAddress,
  onToggle,
  onChange,
}) => {
  const toggleButton = <Button type="link" icon={<Icons.Add />} onClick={onToggle}>{toggleLabel}</Button>;

  const stateInput = isStateDropdown ? (
    <Select
      label="State/territory"
      name="state"
      value={state}
      onChange={handleInputChange(onChange)}
      className={style.state}
    >
      {[<Select.Option value="placeholder" label="" hidden />].concat(
        stateOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        )),
      )}
    </Select>
  ) : (
    <Input
      label="Region"
      name="state"
      value={state}
      onChange={handleInputChange(onChange)}
    />
  );

  const view = (
    <>
      <fieldset className={style.addressGroup}>
        <legend className="sr-only">Address</legend>
        <CountryCombobox
          hideLabel={false}
          label="Country"
          name="country"
          selectedId={country}
          onChange={onComboBoxChange(onChange, 'country')}
        />
        <TextArea
          name="street"
          label="Address"
          autoSize
          rows={3}
          resize="vertical"
          maxLength={255}
          value={street}
          onChange={handleInputChange(onChange)}
        />

        <Input
          name="city"
          label="Suburb/town/locality"
          value={city}
          onChange={handleInputChange(onChange)}
        />
        {stateInput}
        <Input
          name="postcode"
          label="Postcode"
          value={postcode}
          onChange={handleInputChange(onChange)}
          className={style.postcode}
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Contact information</legend>
        <Input
          name="businessContact"
          label="Contact person"
          value={businessContact}
          onChange={handleInputChange(onChange)}
        />
        <Input
          name="email"
          label="Email"
          value={email}
          onChange={handleInputChange(onChange)}
        />
        <Input
          name="fax"
          label="Fax"
          value={fax}
          onChange={handleInputChange(onChange)}
          className={style.fax}
        />
        <PhoneNumberList
          inputClassName={style.phone}
          phoneNumbers={phoneNumbers}
          hasAddPhoneButton={hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onChange)}
        />
      </fieldset>
    </>
  );

  return (
    <FieldGroup label={title}>
      { showAddress ? view : toggleButton }
    </FieldGroup>
  );
};

export default Address;
