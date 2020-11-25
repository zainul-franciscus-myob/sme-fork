import {
  Accordion,
  Checkbox,
  Input,
  Select,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getContactModalShippingAddress } from '../../ContactModalSelectors';
import CountryCombobox from '../../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../../components/phoneNumberList/PhoneNumberList';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import style from './Address.module.css';

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const ShippingAddress = ({
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
  onChange,
  isBillingAddressCopied,
  onCopyToggle,
}) => {
  const stateInput = isStateDropdown ? (
    <Select
      label="State/territory"
      name="state"
      value={state}
      onChange={handleInputChange(onChange)}
      disabled={isBillingAddressCopied}
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
      disabled={isBillingAddressCopied}
      onChange={handleInputChange(onChange)}
    />
  );

  const view = (
    <Accordion label={title}>
      <Checkbox
        name="CopyBillingAddress"
        label="Same as billing address"
        checked={isBillingAddressCopied}
        onChange={handleCheckboxChange(onCopyToggle)}
      />
      <CountryCombobox
        hideLabel={false}
        label="Country"
        name="country"
        selectedId={country}
        onChange={handleComboboxChange('country', onChange)}
        disabled={isBillingAddressCopied}
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
        disabled={isBillingAddressCopied}
      />
      <Input
        name="city"
        label="Suburb/town/locality"
        value={city}
        onChange={handleInputChange(onChange)}
        disabled={isBillingAddressCopied}
      />
      {stateInput}
      <Input
        name="postcode"
        label="Postcode"
        value={postcode}
        onChange={handleInputChange(onChange)}
        disabled={isBillingAddressCopied}
        width="xs"
      />
      <Input
        name="businessContact"
        label="Contact person"
        value={businessContact}
        onChange={handleInputChange(onChange)}
        disabled={isBillingAddressCopied}
      />
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={handleInputChange(onChange)}
        disabled={isBillingAddressCopied}
      />
      <Input
        name="fax"
        label="Fax"
        value={fax}
        onChange={handleInputChange(onChange)}
        disabled={isBillingAddressCopied}
        width="md"
      />
      <PhoneNumberList
        inputClassName={style.phone}
        phoneNumbers={phoneNumbers}
        hasAddPhoneButton={hasAddPhoneButton}
        onPhoneNumbersChange={onPhoneNumberChange(onChange)}
        disabled={isBillingAddressCopied}
      />
    </Accordion>
  );

  return view;
};

const mapStateToProps = (state) => getContactModalShippingAddress(state);

export default connect(mapStateToProps)(ShippingAddress);
