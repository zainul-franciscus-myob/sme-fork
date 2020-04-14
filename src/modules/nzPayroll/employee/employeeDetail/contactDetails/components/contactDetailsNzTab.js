import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  FormHorizontal,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

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
    </FormHorizontal>
  );

  return view;
};

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
});

export default connect(mapStateToProps)(ContactDetailsNzTabView);
