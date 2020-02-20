import {
  Checkbox, CheckboxGroup, FormTemplate, Input, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactDetail, getIsStateDropdown, getStateOptions,
} from '../ContactDetailsTabSelectors';
import CountryCombobox from '../../../../../components/combobox/CountryCombobox';
import PhoneNumberList from '../../../../../components/phoneNumberList/PhoneNumberList';

const onInputChange = handler => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const onCheckBoxChange = handler => (e) => {
  const { name, checked } = e.target;
  handler({ key: name, value: checked });
};

const onSelectChange = handler => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const onComboBoxChange = (handler, key) => (option) => {
  const { value } = option;
  handler({ key, value });
};

const onPhoneNumberChange = handler => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const ContactDetailsTab = (props) => {
  const {
    contactDetail,
    stateOptions,
    onContactDetailsChange,
    isStateDropdown,
  } = props;

  const stateInput = isStateDropdown
    ? (
      <Select
        label="State/territory"
        name="state"
        value={contactDetail.state}
        onChange={onSelectChange(onContactDetailsChange)
        }
        requiredLabel="State/territory is required"
      >
        {stateOptions.map(
          ({ name, value }) => <Select.Option key={value} value={value} label={name} />,
        )}
      </Select>
    )
    : <Input label="State/territory" name="state" value={contactDetail.state} onChange={onInputChange(onContactDetailsChange)} />;

  const view = (
    <React.Fragment>
      <FormTemplate pageHead="">
        <CheckboxGroup
          label="Inactive employee"
          hideLabel
          renderCheckbox={() => (
            <Checkbox name="isInactive" label="Inactive employee" checked={contactDetail.isInactive} onChange={onCheckBoxChange(onContactDetailsChange)} />
          )}
        />

        <Input label="Employee number" name="employeeNumber" value={contactDetail.employeeNumber} onChange={onInputChange(onContactDetailsChange)} />
      </FormTemplate>

      <hr />

      <FormTemplate pageHead="">
        <Input
          label="First name"
          name="firstName"
          value={contactDetail.firstName}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="First name is required"
        />

        <Input
          label="Surname or family name"
          name="lastName"
          value={contactDetail.lastName}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="Surname or family name is required"
        />

        <Input
          label="Address"
          name="address"
          value={contactDetail.address}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="Address is required"
        />

        <Input
          label="Suburb/town/locality"
          name="suburb"
          value={contactDetail.suburb}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="Suburb/town/locality is required"
        />

        {stateInput}

        <Input
          label="Postcode"
          name="postcode"
          value={contactDetail.postcode}
          onChange={onInputChange(onContactDetailsChange)}
          requiredLabel="Postcode is required"
        />

        <CountryCombobox
          hideLabel={false}
          label="Country"
          name="country"
          selectedId={contactDetail.country}
          onChange={onComboBoxChange(onContactDetailsChange, 'country')}
          requiredLabel="Country is required"
        />

        <PhoneNumberList
          phoneNumbers={contactDetail.phoneNumbers}
          hasAddPhoneButton={contactDetail.hasAddPhoneButton}
          onPhoneNumbersChange={onPhoneNumberChange(onContactDetailsChange)}
        />

        <Input label="Email" name="email" value={contactDetail.email} onChange={onInputChange(onContactDetailsChange)} />

        <Input label="Notes" name="notes" value={contactDetail.notes} onChange={onInputChange(onContactDetailsChange)} />
      </FormTemplate>
    </React.Fragment>
  );

  return view;
};

ContactDetailsTab.defaultProps = {
  stateOptions: undefined,
};

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
  stateOptions: getStateOptions(state),
  isStateDropdown: getIsStateDropdown(state),
});

export default connect(mapStateToProps)(ContactDetailsTab);
