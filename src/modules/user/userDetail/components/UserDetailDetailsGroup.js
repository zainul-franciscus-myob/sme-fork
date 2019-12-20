import {
  Checkbox, CheckboxGroup, FieldGroup, Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getUserDetails } from '../userDetailSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const UserDetailDetailsGroup = ({
  userName,
  email,
  isInactive,
  isCreating,
  isAdmin,
  onUserDetailsChange,
}) => (
  <FieldGroup label="Details">
    <Input
      name="userName"
      label="Name"
      requiredLabel={isCreating ? 'This is required' : ''}
      value={userName}
      onChange={handleInputChange(onUserDetailsChange)}
      disabled={!isCreating}
      width="lg"
    />
    <Input
      name="email"
      label="Email"
      requiredLabel={isCreating ? 'This is required' : ''}
      value={email}
      onChange={handleInputChange(onUserDetailsChange)}
      disabled={!isCreating}
      width="lg"
    />
    {
      !isCreating
      && (
        <CheckboxGroup
          label="isInactive"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              key="isInactive"
              name="isInactive"
              label="Inactive user"
              checked={isInactive}
              onChange={handleCheckboxChange(onUserDetailsChange)}
              disabled={!isCreating && isAdmin}
            />)
          }
        />
      )
    }
  </FieldGroup>
);

const mapStateToProps = state => getUserDetails(state);

export default connect(mapStateToProps)(UserDetailDetailsGroup);
