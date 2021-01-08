import { FieldGroup, Input, TextArea } from '@myob/myob-widgets';
import React from 'react';

import CountryCombobox from '../../../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../../../components/phoneNumberList/PhoneNumberList';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const Contact = ({
  personalDetail,
  onPersonalDetailsChange,
  showAddPhoneButton,
}) => (
  <FieldGroup label="Contact">
    <CountryCombobox
      label="Country"
      name="country"
      selectedId={personalDetail.country}
      onChange={handleComboboxChange('country', onPersonalDetailsChange)}
      width="lg"
    />
    <TextArea
      label="Address"
      name="address"
      value={personalDetail.address}
      width="lg"
      rows={1}
      onChange={handleInputChange(onPersonalDetailsChange)}
    />
    <Input
      label="City/town"
      name="suburb"
      value={personalDetail.suburb}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="lg"
    />
    <Input
      label="Region"
      name="state"
      value={personalDetail.state}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="lg"
    />
    <Input
      label="Postcode"
      name="postcode"
      value={personalDetail.postcode}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="xs"
    />
    <PhoneNumberList
      phoneNumbers={personalDetail.phoneNumbers}
      hasAddPhoneButton={showAddPhoneButton}
      onPhoneNumbersChange={onPhoneNumberChange(onPersonalDetailsChange)}
    />
    <Input
      label="Email"
      name="email"
      value={personalDetail.email}
      onChange={handleInputChange(onPersonalDetailsChange)}
      width="lg"
      requiredLabel="Email is required"
    />
  </FieldGroup>
);

export default React.memo(Contact);
