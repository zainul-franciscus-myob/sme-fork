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

import CountryCombobox from '../../../../../../components/combobox/CountryCombobox';
import getContactDetail from '../contactDetailsNzSelector';

const ContactDetailsNzTabView = ({ contactDetail }) => {
  const view = (
    <FormHorizontal layout="primary">
      <FieldGroup label="Details">
        <Input
          label="First name"
          name="firstName"
          value={contactDetail.firstName}
          requiredLabel="First name is required"
          width="lg"
          disabled
        />
        <Input
          label="Surname or family name"
          name="lastName"
          value={contactDetail.lastName}
          requiredLabel="Surname or family name is required"
          width="lg"
          disabled
        />
        <Input
          label="Employee number"
          name="employeeNumber"
          value={contactDetail.employeeNumber}
          width="sm"
          disabled
        />
        <CheckboxGroup
          label="Inactive employee"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isInactive"
              label="Inactive employee"
              checked={contactDetail.isInactive}
              disabled
            />
          )}
        />
      </FieldGroup>
      <FieldGroup label="Address">
        <CountryCombobox
          label="Country"
          name="country"
          selectedId={contactDetail.country}
          onChange={() => {}}
          width="lg"
          disabled
        />
        <TextArea
          label="Address"
          name="address"
          value={contactDetail.address}
          width="lg"
          rows={4}
          onChange={() => {}}
          disabled
        />
        <Input
          label="City/town"
          name="city"
          value={contactDetail.suburb}
          width="lg"
          disabled
        />
        <Input
          label="Region"
          name="region"
          value={contactDetail.state}
          width="lg"
          disabled
        />
        <Input
          label="Postcode"
          name="postcode"
          value={contactDetail.postcode}
          width="xs"
          disabled
        />
        <Input
          label="Email"
          name="email"
          value={contactDetail.email}
          width="lg"
          disabled
        />
        <Input
          label="Phone"
          name="phone1"
          value={contactDetail.phoneNumbers[0]}
          width="lg"
          disabled
        />
        <Input
          label="Phone"
          name="phone2"
          value={contactDetail.phoneNumbers[1]}
          width="lg"
          hideLabel
          disabled
        />
        <Input
          label="Phone"
          name="phone3"
          value={contactDetail.phoneNumbers[2]}
          width="lg"
          hideLabel
          disabled
        />
      </FieldGroup>
      <FieldGroup label="More information">
        <TextArea
          label="Notes"
          name="notes"
          value={contactDetail.notes}
          rows={3}
          width="lg"
          onChange={() => {}}
          disabled
        />
      </FieldGroup>
    </FormHorizontal>
  );

  return view;
};

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
});

export default connect(mapStateToProps)(ContactDetailsNzTabView);
