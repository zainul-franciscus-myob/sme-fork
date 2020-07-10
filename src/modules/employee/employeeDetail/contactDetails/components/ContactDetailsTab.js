import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  FormHorizontal,
  Input,
  Select,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactDetail,
  getIsStateDropdown,
  getStateOptions,
} from '../ContactDetailsTabSelectors';
import CountryCombobox from '../../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../../components/phoneNumberList/PhoneNumberList';

const onInputChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const onCheckBoxChange = (handler) => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const onSelectChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const onComboBoxChange = (handler, key) => (option) => {
  const { id: value } = option;
  handler({ key, value });
};

const onPhoneNumberChange = (handler) => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const ContactDetailsTab = (props) => {
  const {
    contactDetail,
    stateOptions,
    onContactDetailsChange,
    isStateDropdown,
  } = props;

  const stateInput = isStateDropdown ? (
    <Select
      label="State/territory"
      name="state"
      value={contactDetail.state}
      onChange={onSelectChange(onContactDetailsChange)}
      width="xs"
    >
      {stateOptions.map(({ name, id }) => (
        <Select.Option key={id} value={id} label={name} />
      ))}
    </Select>
  ) : (
    <Input
      label="State/territory"
      name="state"
      value={contactDetail.state}
      onChange={onInputChange(onContactDetailsChange)}
    />
  );

  const view = (
    <FormHorizontal layout="primary">
      <FieldGroup label="Details">
        <Input
          label="First name"
          name="firstName"
          value={contactDetail.firstName}
          onChange={onInputChange(onContactDetailsChange)}
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
          hideLabel={false}
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
          onChange={onInputChange(onContactDetailsChange)}
          rows={3}
          width="lg"
        />
        <Input
          label="Suburb/town/locality"
          name="suburb"
          value={contactDetail.suburb}
          onChange={onInputChange(onContactDetailsChange)}
          width="lg"
        />
        {stateInput}
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
          hasAddPhoneButton={contactDetail.hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onContactDetailsChange)}
        />
      </FieldGroup>
      <FieldGroup label="More information">
        <TextArea
          label="Notes"
          name="notes"
          value={contactDetail.notes}
          onChange={onInputChange(onContactDetailsChange)}
          rows={3}
          width="lg"
        />
      </FieldGroup>
    </FormHorizontal>
  );

  return view;
};

ContactDetailsTab.defaultProps = {
  stateOptions: undefined,
};

const mapStateToProps = (state) => ({
  contactDetail: getContactDetail(state),
  stateOptions: getStateOptions(state),
  isStateDropdown: getIsStateDropdown(state),
});

export default connect(mapStateToProps)(ContactDetailsTab);
