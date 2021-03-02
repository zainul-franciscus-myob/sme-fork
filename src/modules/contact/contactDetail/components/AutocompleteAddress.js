import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Icons,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import CountryEditableCombobox from '../../../../components/combobox/CountryEditableCombobox';
import PhoneNumberList from '../../../../components/phoneNumberList/PhoneNumberList';
import StateEditableCombobox from '../../../../components/combobox/StateEditableCombobox';
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
  disabled,
  isShippingAddressSameAsBillingAddress,
  onSameAsBillingAddressChange,
  showSameAsBillingAddress,
  shouldShowAutocompleteAddressCombobox,
}) => {
  const stateInput = isStateDropdown ? (
    <StateEditableCombobox
      hideLabel={false}
      name="state"
      selectedId={state}
      onChange={handleComboboxChange('state', onAddressChange)}
      width="lg"
      label="State/territory"
      items={stateOptions}
      disabled={disabled}
    />
  ) : (
    <Input
      label="Region"
      name="state"
      value={state}
      onChange={handleInputChange(onAddressChange)}
      disabled={disabled}
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
      disabled={disabled}
    />
  );

  return (
    <FieldGroup label={title}>
      {showSameAsBillingAddress && (
        <fieldset className={style.sameAsBilling}>
          <legend className="sr-only">
            Make shipping address same as billing address
          </legend>
          <CheckboxGroup
            label="Same as billing address"
            hideLabel
            renderCheckbox={() => (
              <Checkbox
                name="isSameAsBillingAddress"
                label="Same as billing address"
                checked={isShippingAddressSameAsBillingAddress}
                onChange={() =>
                  onSameAsBillingAddressChange(
                    !isShippingAddressSameAsBillingAddress
                  )
                }
              />
            )}
          />
        </fieldset>
      )}
      <fieldset className={style.addressGroup}>
        <legend className="sr-only">Address</legend>
        <CountryEditableCombobox
          hideLabel={false}
          label="Country"
          name="country"
          selectedId={country}
          onChange={handleComboboxChange('country', onAddressChange)}
          width="lg"
          disabled={disabled}
        />
        {address}
        <Input
          name="city"
          label="Suburb/town/locality"
          value={city}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
          disabled={disabled}
        />
        {stateInput}
        <Input
          name="postcode"
          label="Postcode"
          value={postcode}
          onChange={handleInputChange(onAddressChange)}
          width="xs"
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
        />
        <Input
          name="fax"
          label="Fax"
          value={fax}
          onChange={handleInputChange(onAddressChange)}
          width="md"
          disabled={disabled}
        />
        <PhoneNumberList
          inputClassName={style.phone}
          phoneNumbers={phoneNumbers}
          hasAddPhoneButton={hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onAddressChange)}
          disabled={disabled}
        />
        <Input
          name="website"
          label="Website"
          value={website}
          onChange={handleInputChange(onAddressChange)}
          width="lg"
          disabled={disabled}
        />
      </fieldset>
    </FieldGroup>
  );
};

export default AutocompleteAddress;
