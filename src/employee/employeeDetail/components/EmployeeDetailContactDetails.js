import {
  Checkbox, CheckboxGroup, FormTemplate, Input, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getContactDetail, getCountryOptions, getStateOptions,
} from '../EmployeeDetailSelectors';
import PhoneNumberList from '../../../components/phoneNumberList/PhoneNumberList';

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

const onPhoneNumberChange = handler => (phoneNumbers) => {
  handler({ key: 'phoneNumbers', value: phoneNumbers });
};

const EmployeeDetailContactDetails = (props) => {
  const {
    contactDetail,
    stateOptions,
    countryOptions,
    onContactDetailsChange,
  } = props;

  const view = (
    <React.Fragment>
      <FormTemplate>
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

      <FormTemplate>
        <Input label="First name" name="firstName" value={contactDetail.firstName} onChange={onInputChange(onContactDetailsChange)} />

        <Input label="Surname or family name" name="lastName" value={contactDetail.lastName} onChange={onInputChange(onContactDetailsChange)} />

        <Input label="Address" name="address" value={contactDetail.address} onChange={onInputChange(onContactDetailsChange)} />

        <Input label="Suburb/town/locality" name="suburb" value={contactDetail.suburb} onChange={onInputChange(onContactDetailsChange)} />

        <Select label="State/territory" name="state" value={contactDetail.state} onChange={onSelectChange(onContactDetailsChange)}>
          {stateOptions.map(
            ({ name, value }) => <Select.Option key={value} value={value} label={name} />,
          )}
        </Select>

        <Input label="Postcode" name="postcode" value={contactDetail.postcode} onChange={onInputChange(onContactDetailsChange)} />

        <Select label="Country" name="country" value={contactDetail.country} onChange={onSelectChange(onContactDetailsChange)}>
          {countryOptions.map(
            ({ name, value }) => <Select.Option key={value} value={value} label={name} />,
          )}
        </Select>

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

const contactDetailShape = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  suburb: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string),
  hasAddPhoneButton: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  isInactive: PropTypes.bool.isRequired,
  employeeNumber: PropTypes.string.isRequired,
};

const optionShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

EmployeeDetailContactDetails.propTypes = {
  contactDetail: PropTypes.shape(contactDetailShape).isRequired,
  stateOptions: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
  countryOptions: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
  stateOptions: getStateOptions(state),
  countryOptions: getCountryOptions(state),
});

export default connect(mapStateToProps)(EmployeeDetailContactDetails);
