import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  FormHorizontal,
  Input,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAddPhoneButton,
  getContactDetail,
} from '../ContactDetailsNzSelector';
import CountryCombobox from '../../../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../../../components/phoneNumberList/PhoneNumberList';

const onInputChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const onCheckBoxChange = (handler) => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const onComboBoxChange = (handler, key) => (option) => {
  const { id: value } = option;
  handler({ key, value });
};

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const ContactDetailsNzTabView = ({
  contactDetail,
  showAddPhoneButton,
  onContactDetailsChange,
}) => {
  const view = (
    <FormHorizontal layout="primary">
      <FieldGroup label="Details">
        <Input
          label="First name"
          name="firstName"
          value={contactDetail.firstName}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="First name is required"
          width="lg"
        />
        <Input
          label="Surname or family name"
          name="lastName"
          value={contactDetail.lastName}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="Surname or family name is required"
          width="lg"
        />
        <Input
          label="Employee number"
          name="employeeNumber"
          value={contactDetail.employeeNumber}
          onChange={onInputChange(onContactDetailsChange)}
          width="sm"
        />
        <CheckboxGroup
          label="Inactive employee"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isInactive"
              label="Inactive employee"
              checked={contactDetail.isInactive}
              onChange={onCheckBoxChange(onContactDetailsChange)}
            />
          )}
        />
      </FieldGroup>
      <FieldGroup label="Address">
        <CountryCombobox
          label="Country"
          name="country"
          selectedId={contactDetail.country}
          onChange={onComboBoxChange(onContactDetailsChange, 'country')}
          width="lg"
        />
        <TextArea
          label="Address"
          name="address"
          value={contactDetail.address}
          width="lg"
          rows={4}
          onChange={onInputChange(onContactDetailsChange)}
        />
        <Input
          label="City/town"
          name="suburb"
          value={contactDetail.suburb}
          onChange={onInputChange(onContactDetailsChange)}
          width="lg"
        />
        <Input
          label="Region"
          name="state"
          value={contactDetail.state}
          onChange={onInputChange(onContactDetailsChange)}
          width="lg"
        />
        <Input
          label="Postcode"
          name="postcode"
          value={contactDetail.postcode}
          onChange={onInputChange(onContactDetailsChange)}
          width="xs"
        />
        <Input
          label="Email"
          name="email"
          value={contactDetail.email}
          onChange={onInputChange(onContactDetailsChange)}
          width="lg"
        />
        <PhoneNumberList
          phoneNumbers={contactDetail.phoneNumbers}
          hasAddPhoneButton={showAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onContactDetailsChange)}
        />
      </FieldGroup>
      <FieldGroup label="More information">
        <TextArea
          label="Notes"
          name="notes"
          value={contactDetail.notes}
          rows={3}
          width="lg"
          onChange={onInputChange(onContactDetailsChange)}
        />
      </FieldGroup>
    </FormHorizontal>
  );

  return view;
};

const mapStateToProps = (state) => ({
  contactDetail: getContactDetail(state),
  showAddPhoneButton: getAddPhoneButton(state),
});

export default connect(mapStateToProps)(ContactDetailsNzTabView);
