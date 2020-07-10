import { Alert, FieldGroup, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmail,
  getFirstName,
  getLastName,
  getPhone,
  getShowAlert,
} from '../stpYourRoleSelectors';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const ContactDetails = ({
  onFieldChange,
  showAlert,
  firstName,
  lastName,
  email,
  phone,
}) => (
  <FieldGroup label="Contact Details">
    <p>
      If you can&apos;t find your existing contact information, you&apos;ll need
      to create a new contact and type your details in
    </p>
    {showAlert && (
      <Alert type="info">
        Looks like we&apos;ve already got some information saved for this
        business. You can use this contact person, or add someone different for
        payroll reporting
      </Alert>
    )}
    <Input
      requiredLabel="This is required"
      name="firstName"
      label="First Name"
      onChange={handleInputChange(onFieldChange)}
      value={firstName}
    />
    <Input
      requiredLabel="This is required"
      name="lastName"
      label="Last Name"
      onChange={handleInputChange(onFieldChange)}
      value={lastName}
    />
    <Input
      requiredLabel="This is required"
      name="phone"
      label="Phone"
      onChange={handleInputChange(onFieldChange)}
      value={phone}
    />
    <Input
      requiredLabel="This is required"
      name="email"
      label="Email"
      onChange={handleInputChange(onFieldChange)}
      value={email}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  firstName: getFirstName(state),
  lastName: getLastName(state),
  email: getEmail(state),
  phone: getPhone(state),
  showAlert: getShowAlert(state),
});

export default connect(mapStateToProps)(ContactDetails);
